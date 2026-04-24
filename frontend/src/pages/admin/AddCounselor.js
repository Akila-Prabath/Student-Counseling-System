import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddCounselor() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
    phone: "",
    bio: ""
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

      Object.keys(form).forEach((key) => {
        if (key !== "confirmPassword") {
          data.append(key, form[key]);
        }
      });

      data.append("role", "counselor");

      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      await API.post("/auth/register", data);

      setMessage("✅ Counselor added successfully");

      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        specialization: "",
        experience: "",
        phone: "",
        bio: ""
      });

      setPreview(null);

    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Failed to add counselor");
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader />

        <h2 className="text-2xl font-bold mt-6 mb-6 dark:text-white">
          Add New Counselor
        </h2>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow w-full">

          {message && (
            <p className="mb-4 text-center text-orange-600">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">

            {/* LEFT IMAGE */}
            <div className="md:col-span-1 flex flex-col items-center gap-4 border-r pr-6">

              <div className="w-52 h-52 rounded-full bg-gray-200 overflow-hidden shadow">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" onChange={handleImageChange} />

              <p className="text-xs text-gray-500 text-center">
                Upload profile picture <br />
                (Max 2MB recommended)
              </p>
            </div>

            {/* RIGHT FORM */}
            <div className="md:col-span-2 space-y-5">

              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Dr. Silva"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="e.g. drsilva"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    required
                  />
                </div>

              </div>

              {/* Contact */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. dr@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="e.g. 0771234567"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

              </div>

              {/* Professional Info */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g. Anxiety, Depression"
                    value={form.specialization}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="e.g. 5 years"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-semibold">Bio</label>
                <textarea
                  name="bio"
                  placeholder="Short description about counselor"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  rows="3"
                />
              </div>

              {/* Password */}
              <div className="grid md:grid-cols-2 gap-4">

                <div className="relative">
                  <label className="text-sm font-semibold">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    required
                  />
                  <span
                    className="absolute right-3 top-10 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="relative">
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                    required
                  />
                  <span
                    className="absolute right-3 top-10 cursor-pointer"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

              </div>

              {/* BUTTON */}
              <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
                Add Counselor
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCounselor;