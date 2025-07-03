import { UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

export default function Sidebar() {
	const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
		useChatStore();

	const { onlineUsers } = useAuthStore();
	const [showOnlineOnly, setShowOnlineOnly] = useState(false);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const filteredUsers = showOnlineOnly
		? users.filter((user) => onlineUsers.includes(user._id))
		: users;

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="flex flex-col w-20 h-full border-r transition-all lg:w-72 border-base-300 dura2000">
			<div className="p-5 w-full border-b border-base-300">
				<div className="flex gap-2 items-center">
					<UsersIcon className="size-6" />
					<span className="hidden font-medium lg:block">Contacts</span>
				</div>
				<div className="hidden gap-2 items-center mt-3 lg:flex">
					<label className="flex gap-2 items-center cursor-pointer">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) => setShowOnlineOnly(e.target.checked)}
							className="checkbox checkbox-sm"
						/>
						<span className="text-sm">Show online only</span>
					</label>
					<span className="text-xs text-zinc-500">
						({onlineUsers.length - 1} online)
					</span>
				</div>
			</div>

			<div className="overflow-y-auto py-3">
				{filteredUsers.map((user) => (
					<button
						type="button"
						key={user._id}
						onClick={() => setSelectedUser(user)}
						className={`flex gap-3 items-center p-3 w-full transition-colors hover:bg-base-300 ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
					>
						<div className="relative mx-auto lg:mx-0">
							<img
								src={user.profilePic || "/avatar.png"}
								alt={user.name}
								className="object-cover rounded-full size-12"
							/>
							{onlineUsers.includes(user._id) && (
								<span className="absolute right-0 bottom-0 bg-green-500 rounded-full ring-2 size-3 ring-zinc-900" />
							)}
						</div>

						{/* only visible in large screens */}
						<div className="hidden min-w-0 text-left lg:block">
							<div className="font-medium truncate">{user.fullName}</div>
							<div className="text-sm text-zinc-400">
								{onlineUsers.includes(user._id) ? "Online" : "Offline"}
							</div>
						</div>
					</button>
				))}

				{filteredUsers.length === 0 && (
					<div className="py-4 text-center text-zinc-500">No online users</div>
				)}
			</div>
		</aside>
	);
}

function SidebarSkeleton() {
	// Create 8 skeleton items
	const skeletonContacts = Array(8).fill(null);

	return (
		<aside className="flex flex-col w-20 h-full border-r transition-all duration-200 lg:w-72 border-base-300">
			{/* Header */}
			<div className="p-5 w-full border-b border-base-300">
				<div className="flex gap-2 items-center">
					<UsersIcon className="w-6 h-6" />
					<span className="hidden font-medium lg:block">Contacts</span>
				</div>
			</div>

			{/* Skeleton Contacts */}
			<div className="overflow-y-auto py-3 w-full">
				{skeletonContacts.map((_, idx) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <false-positive>
					<div key={idx} className="flex gap-3 items-center p-3 w-full">
						{/* Avatar skeleton */}
						<div className="relative mx-auto lg:mx-0">
							<div className="rounded-full skeleton size-12" />
						</div>

						{/* User info skeleton - only visible on larger screens */}
						<div className="hidden flex-1 min-w-0 text-left lg:block">
							<div className="mb-2 w-32 h-4 skeleton" />
							<div className="w-16 h-3 skeleton" />
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}
