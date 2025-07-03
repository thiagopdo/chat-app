import { XIcon } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

export default function ChatHeader() {
 const { selectedUser, setSelectedUser } = useChatStore();
 const { onlineUsers } = useAuthStore();

 return (
  <div className="p-2.5 border-b border-base-300">
   <div className="flex justify-between items-center">
    <div className="flex gap-3 items-center">
     {/* Avatar */}
     <div className="avatar">
      <div className="relative rounded-full size-10">
       <img
        src={selectedUser.profilePic || "/avatar.png"}
        alt={selectedUser.fullName}
       />
      </div>
     </div>

     {/* User info */}
     <div>
      <h3 className="font-medium">{selectedUser.fullName}</h3>
      <p className="text-sm text-base-content/70">
       {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
      </p>
     </div>
    </div>

    {/* Close button */}
    <button type="button" onClick={() => setSelectedUser(null)}>
     <XIcon />
    </button>
   </div>
  </div>
 );
}
