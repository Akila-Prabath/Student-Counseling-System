import { useState } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", { username, password });

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role (optional)
      const role = res.data.user.role;

      if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }

      onClose();

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >

      {/* Modal */}
      <div
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Title */}
        <h2 className="text-3xl font-bold mb-2 text-center">
          Welcome Back to MindCare
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-red-800 hover:text-red text-xl"
        >
          ✕
        </button>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-orange-600 font-semibold cursor-pointer hover:underline"
            onClick={onSwitchToRegister}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginModal;