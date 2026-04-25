import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";

function AdminProfile() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        profilePic: null
    });

    const [preview, setPreview] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/admin/profile");

            setForm({
                name: res.data.name || "",
                username: res.data.username || "",
                email: res.data.email || "",
                password: "",
                profilePic: null
            });

            if (res.data.profilePic) {
                setPreview(`http://localhost:8070/uploads/${res.data.profilePic}`);
            }

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "profilePic") {
            setForm({ ...form, profilePic: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("username", form.username);
            formData.append("email", form.email);

            if (form.password) {
                formData.append("password", form.password);
            }

            if (form.profilePic) {
                formData.append("profilePic", form.profilePic);
            }

            await API.put("/admin/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("✅ Profile updated successfully");

        } catch (err) {
            alert("❌ Update failed");
        }
    };

    return (
        <div className="bg-gradient-to-br from-orange-50 to-orange-300 dark:from-gray-900 dark:to-gray-800 min-h-screen">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className={`${collapsed ? "md:ml-20" : "md:ml-64"} p-6 space-y-6`}>

                <AdminHeader
                    setMobileOpen={setMobileOpen}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                {/* 🔥 TITLE */}
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    My Profile
                </h2>

                {/* 🔥 PROFILE CARD */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">

                        {/* 🔥 LEFT SIDE (IMAGE) */}
                        <div className="flex flex-col items-center gap-4 border-r dark:border-gray-700 pr-4">

                            <img
                                src={preview || "https://i.pravatar.cc/150"}
                                alt="profile"
                                className="w-32 h-32 rounded-full object-cover border shadow"
                            />

                            <input
                                type="file"
                                name="profilePic"
                                onChange={handleChange}
                                className="text-sm"
                            />

                            <p className="text-xs text-gray-500 text-center">
                                Upload a new profile picture
                            </p>

                        </div>

                        {/* 🔥 RIGHT SIDE (FORM) */}
                        <div className="md:col-span-2 space-y-4">

                            {/* NAME */}
                            <div>
                                <label className="text-sm text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg 
                  dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* USERNAME */}
                            <div>
                                <label className="text-sm text-gray-500">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg 
                  dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="text-sm text-gray-500">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg 
                  dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="text-sm text-gray-500">
                                    New Password (optional)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Leave blank to keep current password"
                                    className="w-full mt-1 p-2 border rounded-lg 
                  dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default AdminProfile;