import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const SOCKET_URL = "http://localhost:5000"; // Ensure this is correct

const socket = io(SOCKET_URL, { transports: ["websocket", "polling"] });

const ChatRoom = () => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);
    const messagesEndRef = useRef(null);

    const navigate = useNavigate();
    const targetSocketId = "some-socket-id"; // Replace this with actual target socket ID

    const generateRoomId = () => {
        setRoomId(uuidv4());
    };

    const joinRoom = () => {
        if (!username.trim()) return alert("Please enter your name!");
        if (!roomId.trim()) return alert("Please enter or generate a Room ID!");

        socket.emit("join_room", { name: username, roomId });
        setJoined(true);
    };

    const sendMessage = () => {
        if (message.trim() === "") return;
        socket.emit("send_message", { name: username, message, roomId });
        setMessage("");
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        console.log("🔗 Connecting to WebSocket...");

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket:", socket.id);
        });

        socket.on("receive_message", (data) => {
            console.log("📩 New message:", data);
            setMessages((prev) => [...prev, data]);
        });

        socket.on("receive_old_messages", (oldMessages) => {
            console.log("📜 Loaded old messages:", oldMessages);
            setMessages(oldMessages);
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from WebSocket");
        });

        return () => {
            socket.off("connect");
            socket.off("receive_message");
            socket.off("receive_old_messages");
            socket.off("disconnect");
        };
    }, []);

    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-[#010e28] bg-[linear-gradient(to_bottom,_#082740_1px,_transparent_1px),_linear-gradient(to_right,_#082740_1px,_transparent_1px)] [background-size:30px_30px] bg-center overflow-x-hidden animate-bgmove">
            {!joined ? (
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Chat App</h1>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-3 border text-black rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter or Generate Room ID"
                            className="flex-1 p-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                        <button
                            onClick={generateRoomId}
                            className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Generate
                        </button>
                    </div>

                    <button
                        onClick={joinRoom}
                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                        Join Chat
                    </button>
                </div>
            ) : (
                <div className="flex flex-col h-screen w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden relative">
                    {/* Call Button */}
        

                    <div className="p-4 bg-green-500 text-black text-center font-semibold">
                        Room ID: {roomId}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 text-black">
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.name === username ? "justify-end" : "justify-start"} mb-2`}
                                >
                                    <div
                                        className={`p-3 max-w-xs rounded-lg shadow ${
                                            msg.name === username ? "bg-green-500 text-white" : "bg-gray-400"
                                        }`}
                                    >
                                        <p className="text-sm font-semibold">{msg.name}</p>
                                        <p>{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">No messages yet...</p>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    <div className="p-4 bg-white flex">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 p-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;
