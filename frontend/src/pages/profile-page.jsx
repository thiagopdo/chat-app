import { CameraIcon, MailIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
 const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
 const [selectedImg, setSelectedImg] = useState(null);

 async function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
   const base64Image = reader.result;
   setSelectedImg(base64Image);
   await updateProfile({ profilePic: base64Image });
  };
 }

 return (
  <div className="pt-20 h-screen">
   <div className="p-4 py-8 mx-auto max-w-2xl">
    <div className="p-6 space-y-8 rounded-xl bg-base-300">
     <div className="text-center">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-2">Your profile information</p>
     </div>

     {/* avatar */}
     <div className="flex flex-col gap-4 items-center">
      <div className="relative">
       <img
        src={selectedImg || authUser.profilePic || "/avatar.png"}
        alt="Profile"
        className="object-cover rounded-full border-4 size-32"
       />
       <label
        htmlFor="avatar-upload"
        className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
       >
        <CameraIcon className="w-5 h-5 text-base-200" />
        <input
         type="file"
         id={"avatar-upload"}
         className="hidden"
         accept="image/*"
         onChange={handleImageUpload}
         disabled={isUpdatingProfile}
        />
       </label>
      </div>
      <p className="text-sm text-zinc-400">
       {isUpdatingProfile
        ? "Uploading..."
        : "Click the camera icon to update your photo"}
      </p>
     </div>

     <div className="space-y-6">
      <div className="space-y-1.5">
       <div className="flex gap-2 items-center text-sm text-zinc-400">
        <UserIcon className="w-4 h-4" />
        Full Name
       </div>
       <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
        {authUser?.fullName}
       </p>
      </div>

      <div className="space-y-1.5">
       <div className="flex gap-2 items-center text-sm text-zinc-400">
        <MailIcon className="w-4 h-4" />
        Email Address
       </div>
       <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
        {authUser?.email}
       </p>
      </div>
     </div>

     <div className="p-6 mt-6 rounded-xl bg-base-300">
      <h2 className="mb-4 text-lg font-medium">Account Information</h2>
      <div className="space-y-3 text-sm">
       <div className="flex justify-between items-center py-2 border-b border-zinc-700">
        <span>Member Since</span>
        <span>{authUser.createdAt?.split("T")[0]}</span>
       </div>
       <div className="flex justify-between items-center py-2">
        <span>Account Status</span>
        <span className="text-green-500">Active</span>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
