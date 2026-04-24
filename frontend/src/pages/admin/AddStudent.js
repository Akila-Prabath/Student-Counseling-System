import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddStudent() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [message, setMessage] = useState("");

    const [collapsed, setCollapsed] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 🔥 Image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            return setMessage("❌ Passwords do not match");
        }

        try {
            const data = new FormData();
            data.append("name", form.name);
            data.append("username", form.username);
            data.append("email", form.email);
            data.append("password", form.password);
            data.append("role", "student");

            if (profilePic) {
                data.append("profilePic", profilePic);
            }

            await API.post("/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage("✅ Student added successfully");

            setForm({
                name: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            setPreview(null);

        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Failed to add student");
        }
    };

    return (
        <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">

            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

                <AdminHeader />

                <h2 className="text-2xl font-bold mt-6 mb-6 dark:text-white">
                    Add New Student
                </h2>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow w-full">

                    {message && (
                        <p className="mb-4 text-center text-orange-600">
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">

                        {/* 🔥 LEFT: PROFILE IMAGE */}
                        <div className="md:col-span-1 flex flex-col items-center gap-4 border-r pr-6">

                            <div className="w-52 h-52 rounded-full bg-gray-200 overflow-hidden shadow">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                
                                className="text-sm "
                            /> 

                            <p className="text-xs text-gray-500 text-center">
                                Upload profile picture <br />
                                (Max 2MB recommended)
                            </p>
                        </div>

                        {/* 🔥 RIGHT: FORM FIELDS */}
                        <div className="md:col-span-2 space-y-5">

                            {/* Row 1 */}
                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="e.g. Akila Prabath"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="e.g. akila123"
                                        value={form.username}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none"
                                        required
                                    />
                                </div>

                            </div>

                            {/* Row 2 */}
                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="e.g. akila@gmail.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="e.g. StrongPass123"
                                            value={form.password}
                                            onChange={handleChange}
                                            className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none"
                                            required
                                        />
                                        <span
                                            className="absolute right-3 top-4 cursor-pointer text-gray-500"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Row 3 */}
                            <div>
                                <label className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Re-enter password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 outline-none"
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-4 cursor-pointer text-gray-500"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                    >
                                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            {/* BUTTON */}
                            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition mt-2">
                                Add Student
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;