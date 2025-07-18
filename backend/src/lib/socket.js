import http from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
	},
});

export function getReceiverSocketId(userId) {
	return userSocketMap[userId];
}

// This map will hold user IDs and their corresponding socket IDs
const userSocketMap = {};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
	const userId = socket.handshake.query.userId;
	if (userId) {
		userSocketMap[userId] = socket.id;
		//console.log(`User ${userId} connected with socket ID ${socket.id}`);
	}
	// Emit an event to the client to confirm connection
	io.emit("getOnlineUser", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("a user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUser", Object.keys(userSocketMap));
	});
});

export { io, app, server };
