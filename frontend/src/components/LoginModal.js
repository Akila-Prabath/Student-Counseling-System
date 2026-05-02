import { useState } from "react";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!username || !password) {
      return toast.warning("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        username,
        password
      });

      // 🔥 SAVE AUTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // ✅ STANDARDIZE _id
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data.user,
          _id: res.data.user._id || res.data.user.id
        })
      );

      // ✅ SUCCESS TOAST
      toast.success(`Welcome back ${res.data.user.name}!`);

      const role = res.data.user.role;

      // 🔥 CLOSE MODAL
      onClose();

      // 🔥 REDIRECT
      setTimeout(() => {
        if (role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 1000);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Login failed"
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

      {/* MODAL */}
      <div
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl w-[90%] max-w-md shadow-2xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >

        {/* TITLE */}
        <h2 className="text-3xl font-bold mb-2 text-center">
          Welcome Back to MindCare
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        {/* REGISTER */}
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