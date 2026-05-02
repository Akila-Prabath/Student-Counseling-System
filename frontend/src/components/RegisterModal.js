import { useState, useEffect } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const open = () => {};
        window.addEventListener("openRegister", open);
        return () => window.removeEventListener("openRegister", open);
    }, []);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Username validation
        if (form.username.length < 3) {
            toast.error("Username must be at least 3 characters");
            return;
        }

        // Password match validation
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Password length validation
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            await API.post("/auth/register", {
                name: form.name,
                username: form.username,
                email: form.email,
                password: form.password,
            });

            toast.success("Registration successful! Redirecting to login...");

            setForm({
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                onSwitchToLogin();
            }, 1500);

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Title */}
                <h2 className="text-3xl font-bold mb-2 text-center">
                    Create Your Account
                </h2>

                <p className="text-center text-gray-500 mb-6">
                    Register as a student
                </p>

                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    />

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />

                        <span
                            className="absolute right-3 top-3 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
                        />

                        <span
                            className="absolute right-3 top-3 cursor-pointer text-gray-500"
                            onClick={() => setShowConfirm(!showConfirm)}
                        >
                            {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                {/* Switch to Login */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-orange-600 font-semibold cursor-pointer hover:underline"
                        onClick={onSwitchToLogin}
                    >
                        Login
                    </span>
                </p>

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-red-800 text-xl"
                >
                    ✕
                </button>

            </div>
        </div>
    );
}

export default RegisterModal;