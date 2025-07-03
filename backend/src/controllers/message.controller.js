import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export async function getUsersForSidebar(req, res) {
	try {
		const loggedInUserId = req.user._id;
		const filteredUsers = await User.find({
			_id: { $ne: loggedInUserId },
		}).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error fetching users for sidebar:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function getMessages(req, res) {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId: myId, receiverId: userToChatId },
				{ senderId: userToChatId, receiverId: myId },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error fetching messages:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

export async function sendMessage(req, res) {
	try {
		const { text, image } = req.body;
		const { id: receiverId } = req.params;

		const senderId = req.user._id;

		let imageUrl;
		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image);
			imageUrl = uploadResponse.secure_url;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
		});

		await newMessage.save();

    // Emit the new message to the receiver's socket
    // Ensure the receiver is online before emitting
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error sending message:", error.message);
		res.status(500).json({ message: "Internal Server Error" });
	}
}
