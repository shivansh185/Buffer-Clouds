import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for testing
        methods: ["GET", "POST"]
    }
});

const rooms = {}; // Store chat rooms and messages

app.use(cors()); // Fix CORS issues
app.get("/", (req, res) => res.send("WebSocket Server is Running 🚀"));

io.on("connection", (socket) => {
    console.log("New user connected:", socket.id);

    socket.on("join_room", ({ name, roomId }) => {
        if (!roomId) return;
        if (!rooms[roomId]) rooms[roomId] = { messages: [] };

        socket.join(roomId);
        console.log(`${name} joined room: ${roomId}`);
        socket.emit("receive_old_messages", rooms[roomId].messages);
    });

    socket.on("send_message", ({ name, message, roomId }) => {
        if (!roomId) return;
        const chatMessage = { name, message, timestamp: Date.now() };
        rooms[roomId].messages.push(chatMessage);
        io.to(roomId).emit("receive_message", chatMessage);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
