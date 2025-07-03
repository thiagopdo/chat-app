import ChatContainer from "../components/chat-container";
import NoChatSelected from "../components/no-chat-selected";
import Sidebar from "../components/sidebar";
import { useChatStore } from "../store/useChatStore";

function HomePage() {
	const { selectedUser } = useChatStore();

	return (
		<div className="h-screen bg-base-200">
			<div className="flex justify-center items-center px-4 pt-20">
				<div className="w-full max-w-6xl rounded-lg shadow-xl bg-base-100 h-[calc(100vh-8rem)]">
					<div className="flex overflow-hidden h-full rounded-lg">
						<Sidebar />
						{selectedUser ? <ChatContainer /> : <NoChatSelected />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
