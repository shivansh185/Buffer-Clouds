import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const rooms = {};
const users = {}; // username -> { socketId, roomId }

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    // Join Room
    socket.on("join_room", ({ name, roomId }) => {
        if (!rooms[roomId]) rooms[roomId] = { messages: [] };
        socket.join(roomId);

        users[name] = { socketId: socket.id, roomId }; // Track users by username

        // Send old messages to this user
        socket.emit("receive_old_messages", rooms[roomId].messages);

        // Notify others
        io.to(roomId).emit("online_users", Object.entries(users)
            .filter(([username, u]) => u.roomId === roomId)
            .map(([username, u]) => ({ socketId: u.socketId, name: username }))
        );
    });

    // Chat Message
    socket.on("send_message", ({ name, message, roomId }) => {
        const msg = { name, message };
        rooms[roomId].messages.push(msg);
        io.to(roomId).emit("receive_message", msg);
    });

    // WebRTC: Call User by Username
    socket.on("call_user", ({ to, offer, callerName }) => {
        // Find the target user by username
        const targetUser = users[to];
        if (targetUser) {
            // Emit the call event to the target user
            io.to(targetUser.socketId).emit("incoming_call", {
                from: socket.id,
                callerName,
                offer,
            });
        } else {
            console.log(`User with username ${to} not found`);
        }
    });

    socket.on("answer_call", ({ to, answer }) => {
        io.to(to).emit("call_answered", { answer });
    });

    socket.on("ice_candidate", ({ to, candidate }) => {
        io.to(to).emit("ice_candidate", { candidate });
    });

    socket.on("disconnect", () => {
        const user = Object.entries(users).find(([name, u]) => u.socketId === socket.id);
        if (user) {
            const [name, { roomId }] = user;
            delete users[name]; // Remove the user by username
            io.to(roomId).emit("online_users", Object.entries(users)
                .filter(([username, u]) => u.roomId === roomId)
                .map(([username, u]) => ({ socketId: u.socketId, name: username }))
            );
        }
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
