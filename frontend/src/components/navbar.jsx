import {
 LogOutIcon,
 MessageSquareIcon,
 SettingsIcon,
 User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export function Navbar() {
 const { logout, authUser } = useAuthStore();

 return (
  <header className="fixed top-0 z-40 w-full border-b backdrop-blur-lg bg-base-100 border-base-300 bg-base-100/80">
   <div className="container px-4 mx-auto h-16">
    <div className="flex justify-between items-center h-full">
     <div className="flex gap-8 items-center">
      <Link
       to="/"
       className="flex items-center gap-2.5 hover:opacity-80 transition-all"
      >
       <div className="flex justify-center items-center rounded-lg size-9 bg-primary/10">
        <MessageSquareIcon className="w-5 h-5 text-primary" />
       </div>
       <h1 className="text-lg font-bold">Chatty</h1>
      </Link>
     </div>

     <div className="flex gap-2 items-center">
      <Link to={"/settings"} className={`gap-2 transition-colors btn btn-sm`}>
       <SettingsIcon className="w-4 h-4" />
       <span className="hidden sm:inline">Settings</span>
      </Link>

      {authUser && (
       <>
        <Link to={"/profile"} className={`gap-2 btn btn-sm`}>
         <User className="size-5" />
         <span className="hidden sm:inline">Profile</span>
        </Link>

        <button
         className="flex gap-2 items-center"
         type="button"
         onClick={logout}
        >
         <LogOutIcon className="size-5" />
         <span className="hidden sm:inline">Logout</span>
        </button>
       </>
      )}
     </div>
    </div>
   </div>
  </header>
 );
}
export default Navbar;
