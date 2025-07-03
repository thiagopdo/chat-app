import { useEffect, useRef } from "react";
import { formatMessageTime } from "../lib/utils.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./chat-header.jsx";
import MessageInput from "./message-input.jsx";

export default function ChatContainer() {
	const {
		messages,
		getMessages,
		isMessagesLoading,
		selectedUser,
		subscribeToMessage,
		unsubscribeFromMessage,
	} = useChatStore();
	const { authUser } = useAuthStore();
	const messageEndRef = useRef(null);

	// Subscribe to new messages when the component mounts
	// and unsubscribe when it unmounts
	useEffect(() => {
		getMessages(selectedUser._id);

		subscribeToMessage();

		return () => unsubscribeFromMessage();
	}, [
		getMessages,
		selectedUser._id,
		subscribeToMessage,
		unsubscribeFromMessage,
	]);

	useEffect(() => {
		if (messageEndRef.current && messages) {
			messageEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	if (isMessagesLoading) {
		return (
			<div className="flex overflow-auto flex-col flex-1">
				<ChatHeader />
				<MessageSkeleton />
				<MessageInput />
			</div>
		);
	}

	return (
		<div className="flex overflow-auto flex-col flex-1">
			<ChatHeader />

			<div className="overflow-y-auto flex-1 p-4 space-y-4">
				{messages.map((message) => (
					<div
						className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
						ref={messageEndRef}
						key={message._id}
					>
						<div className="chat-image avatar">
							<div className="rounded-full border size-10">
								<img
									src={
										message.senderId === authUser._id
											? authUser.profilePic || "/avatar.png"
											: selectedUser.profilePic || "/avatar.png"
									}
									alt="profile pic"
								/>
							</div>
						</div>
						<div className="mb-1 chat-header">
							<time className="text-xs opacity-50">
								{formatMessageTime(message.createdAt)}
							</time>
						</div>
						<div className="flex flex-col chat-bubble">
							{message.image && (
								<img
									src={message.image}
									alt="attachment"
									className="sm:max-w-[200px] rounded-md mb-2"
								/>
							)}
							{message.text && <p>{message.text}</p>}
						</div>
					</div>
				))}
			</div>

			<MessageInput />
		</div>
	);
}

function MessageSkeleton() {
	// Create an array of 6 items for skeleton messages
	const skeletonMessages = Array(6).fill(null);

	return (
		<div className="overflow-y-auto flex-1 p-4 space-y-4">
			{skeletonMessages.map((_, idx) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <false-positive>
					key={idx}
					className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
				>
					<div className="chat-image avatar">
						<div className="rounded-full size-10">
							<div className="w-full h-full rounded-full skeleton" />
						</div>
					</div>

					<div className="mb-1 chat-header">
						<div className="w-16 h-4 skeleton" />
					</div>

					<div className="p-0 bg-transparent chat-bubble">
						<div className="skeleton h-16 w-[200px]" />
					</div>
				</div>
			))}
		</div>
	);
}
