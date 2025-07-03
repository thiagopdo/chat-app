import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar.jsx";
import HomePage from "./pages/home-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import SettingsPage from "./pages/settings-page.jsx";
import SignUpPage from "./pages/signup-page.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

export default function App() {
	const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

	const { theme } = useThemeStore();

	console.log(onlineUsers);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	console.log({ authUser });

	if (isCheckingAuth && !authUser) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader className="animate-spin size-10" />
			</div>
		);
	}
	return (
		<div data-theme={theme}>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/signup"
					element={authUser ? <Navigate to="/" /> : <SignUpPage />}
				/>
				<Route
					path="/login"
					element={authUser ? <Navigate to="/" /> : <LoginPage />}
				/>
				<Route path="/settings" element={<SettingsPage />} />
				<Route
					path="/profile"
					element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
				/>
			</Routes>

			<Toaster />
		</div>
	);
}
