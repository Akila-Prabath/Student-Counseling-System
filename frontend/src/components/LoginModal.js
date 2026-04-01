import { useState } from "react";
import API from "../services/api";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      alert("Login successful!");
      onClose();

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-4 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-4 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-gray-500 hover:text-black"
        >
          Close
        </button>
      </div>

    </div>
  );
}

export default LoginModal;