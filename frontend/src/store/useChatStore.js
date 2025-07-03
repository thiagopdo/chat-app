import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	isUsersLoading: false,
	isMessagesLoading: false,

	getUsers: async () => {
		set({ isUsersLoading: true });
		try {
			const response = await axiosInstance.get("/messages/users");
			set({ users: response.data });
		} catch (error) {
			toast.error(error.message || "An error occurred while loading users.");
		} finally {
			set({ isUsersLoading: false });
		}
	},

	getMessages: async (userId) => {
		set({ isMessagesLoading: true });
		try {
			const response = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: response.data });
		} catch (error) {
			toast.error(error.message || "An error occurred while loading messages.");
		} finally {
			set({ isMessagesLoading: false });
		}
	},

	sendMessage: async (messageData) => {
		// Ensure selectedUser is set before sending a message
		const { selectedUser, messages } = get();
		try {
			const res = await axiosInstance.post(
				`/messages/send/${selectedUser._id}`,
				messageData,
			);
			set({ messages: [...messages, res.data] });
		} catch (error) {
			toast.error(error.response.data.message);
		}
	},

	subscribeToMessage: () => {
		const { selectedUser } = get();
		if (!selectedUser) return;

		const socket = useAuthStore.getState().socket;

		socket.on("newMessage", (newMessage) => {
			const isMessageSentFromSelectedUser =
				newMessage.senderId === selectedUser._id;
			if (!isMessageSentFromSelectedUser) return;
			set({ messages: [...get().messages, newMessage] });
		});
	},

	unsubscribeFromMessage: () => {
		const socket = useAuthStore.getState().socket;
		socket.off("newMessage");
	},

	setSelectedUser: (selectedUser) => {
		set({ selectedUser });
	},
}));
