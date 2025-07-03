import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const SOCKET_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/check");

			set({ authUser: res.data });
			get().connectToSocket();
		} catch (error) {
			console.error("Error checking authentication:", error);
			set({ authUser: null });
		} finally {
			set({ isCheckingAuth: false });
		}
	},

	signup: async (data) => {
		set({ isSigningUp: true });

		try {
			const res = await axiosInstance.post("/auth/signup", data);
			set({ authUser: res.data });
			toast.success("Account created successfully! Please log in.");
			get().connectToSocket();
		} catch (error) {
			toast.error(error.response.data.message || "Error signing up");
			console.error("Error signing up:", error);
		} finally {
			set({ isSigningUp: false });
		}
	},

	login: async (data) => {
		set({ isLoggingIn: true });
		try {
			const res = await axiosInstance.post("/auth/login", data);
			set({ authUser: res.data });
			toast.success("Logged in successfully");

			get().connectToSocket();
		} catch (error) {
			toast.error(error.response.data.message || "Error logging in");
			console.error("Error logging in:", error);
		} finally {
			set({ isLoggingIn: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success("Logged out successfully");
			get().disconnectToSocket();
		} catch (error) {
			toast.error("Error logging out");
			console.error("Error logging out:", error);
		}
	},

	updateProfile: async (data) => {
		set({ isUpdatingProfile: true });
		try {
			const res = await axiosInstance.put("/auth/update-profile", data);
			set({ authUser: res.data });
			toast.success("Profile updated successfully");
		} catch (error) {
			console.log("Error updating profile:", error);
			toast.error(error.response?.data?.message || "Error updating profile");
		} finally {
			set({ isUpdatingProfile: false });
		}
	},
	connectToSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;
		const socket = io(SOCKET_URL, {
			query: {
				userId: authUser._id,
			},
		});
		socket.connect();

		set({ socket });

		socket.on("getOnlineUser", (userIds) => {
			set({ onlineUsers: userIds });
		});
	},
	disconnectToSocket: () => {
		if (get().socket?.connected) get().socket.disconnect();
	},
}));
