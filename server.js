// server.js
const express = require("express");
const next = require("next");
const http = require("http");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = http.createServer(server);

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("🔌 A user connected:", socket.id);

        socket.on("join-room", (auctionId) => {
            socket.join(auctionId);
            console.log(`📦 Joined room: ${auctionId}`);
        });

        socket.on("send-message", (data) => {
            const timestamped = {
                ...data,
                time: new Date().toISOString(),
            };
            io.to(data.auctionId).emit("receive-message", timestamped);
        });

        socket.on("disconnect", () => {
            console.log("❌ A user disconnected:", socket.id);
        });
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
