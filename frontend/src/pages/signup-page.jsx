import {
 EyeIcon,
 EyeOffIcon,
 Loader2,
 LockIcon,
 MailIcon,
 MessageSquare,
 User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/auth-image-pattern";
import { useAuthStore } from "../store/useAuthStore";

function SignUpPage() {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
 });

 const { signup, isSigningUp } = useAuthStore();

 function validateForm() {
  if (!formData.fullName.trim()) return toast.error("Full name is required");
  if (!formData.email.trim()) return toast.error("Email is required");
  if (!/\S+@\S+\.\S+/.test(formData.email))
   return toast.error("Invalid email format");
  if (formData.password.length < 6)
   return toast.error("Password must be at least 6 characters long");

  return true;
 }

 function handleSubmit(e) {
  e.preventDefault();
  const sucess = validateForm();

  if (sucess === true) signup(formData);
 }

 return (
  <div className="grid min-h-screen lg:grid-cols-2">
   {/* LEFTSIDE */}
   <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="space-y-8 w-full max-w-md">
     {/* LOGO */}
     <div className="mb-8 text-center">
      <div className="flex flex-col gap-2 items-center group">
       <div className="flex justify-center items-center rounded-xl transition-colors size-12 bg-primary/10 group-hover:bg-primary/20">
        <MessageSquare className="size-6 text-primary" />
       </div>
       <h1 className="mt-2 text-2xl font-bold">Create Account</h1>
       <p className="text-base-content/60">
        Get started with your free account
       </p>
      </div>
     </div>

     {/* FORM */}
     <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
       <label className="label" htmlFor="fullName">
        <span className="font-medium label-text">Full Name</span>
       </label>
       <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
         <User className="size-5 text-base-content/40" />
        </div>
        <input
         type="text"
         className={`pl-10 w-full input input-bordered`}
         placeholder="John Doe"
         value={formData.fullName}
         onChange={(e) =>
          setFormData({ ...formData, fullName: e.target.value })
         }
        />
       </div>
      </div>
      <div className="form-control">
       <label className="label" htmlFor="email">
        <span className="font-medium label-text">Email</span>
       </label>
       <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
         <MailIcon className="size-5 text-base-content/40" />
        </div>
        <input
         type="email"
         className={`pl-10 w-full input input-bordered`}
         placeholder="you@example.com"
         value={formData.email}
         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
       </div>
      </div>
      <div className="form-control">
       <label className="label" htmlFor="password">
        <span className="font-medium label-text">Password</span>
       </label>
       <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
         <LockIcon className="size-5 text-base-content/40" />
        </div>
        <input
         type={showPassword ? "text" : "password"}
         className={`pl-10 w-full input input-bordered`}
         placeholder="••••••••"
         value={formData.password}
         onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
         }
        />
        <button
         type="button"
         className="flex absolute inset-y-0 right-0 items-center pr-3"
         onClick={() => setShowPassword(!showPassword)}
        >
         {showPassword ? (
          <EyeOffIcon className="size-5 text-base-content/40" />
         ) : (
          <EyeIcon className="size-5 text-base-content/40" />
         )}
        </button>
       </div>
      </div>

      <button
       type="submit"
       className="w-full btn btn-primary"
       disabled={isSigningUp}
      >
       {isSigningUp ? (
        <>
         <Loader2 className="animate-spin size-5" />
         Loading...
        </>
       ) : (
        "Create Account"
       )}
      </button>
     </form>
     <div className="text-center">
      <p className="text-base-content/60">
       Already have an account?{" "}
       <Link to="/login" className="link link-primary">
        Sign in
       </Link>
      </p>
     </div>
    </div>
   </div>

   {/* RIGHTSIDE */}
   <AuthImagePattern
    title="Join our community"
    subtitlë="Connect with friends, share moments, and stay in touch with your loved ones"
   />
  </div>
 );
}

export default SignUpPage;
