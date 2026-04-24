import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function EditCounselor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    phone: "",
    bio: ""
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 FETCH DATA
  useEffect(() => {
    fetchCounselor();
  }, []);

  const fetchCounselor = async () => {
    try {
      const res = await API.get(`/users/${id}`);

      setForm({
        name: res.data.name || "",
        username: res.data.username || "",
        email: res.data.email || "",
        password: "",
        specialization: res.data.specialization || "",
        experience: res.data.experience || "",
        phone: res.data.phone || "",
        bio: res.data.bio || ""
      });

      if (res.data.profilePic) {
        setPreview(`http://localhost:8070/uploads/${res.data.profilePic}`);
      }

    } catch (error) {
      setMessage("❌ Failed to fetch counselor data");
    }
  };

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage("❌ Image must be less than 2MB");
      return;
    }

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔥 UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          data.append(key, form[key]);
        }
      });

      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      await API.put(`/users/${id}`, data);

      setMessage("✅ Counselor updated successfully");

      setTimeout(() => {
        navigate("/admin/counselors");
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Update failed");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader />

        <h2 className="text-2xl font-bold mt-6 mb-6">
          Edit Counselor
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow w-full">

          {message && (
            <p className="mb-4 text-center text-orange-600">{message}</p>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">

            {/* IMAGE */}
            <div className="md:col-span-1 flex flex-col items-center gap-4 border-r pr-6">

              <div className="w-52 h-52 rounded-full bg-gray-200 overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://i.pravatar.cc/150";
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <input type="file" accept="image/*" onChange={handleImageChange} />

            </div>

            {/* FORM */}
            <div className="md:col-span-2 space-y-5">

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-semibold">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
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
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm font-semibold">Bio</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <label className="text-sm font-semibold">Password (Optional)</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Leave blank to keep current"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-gray-100 rounded-lg"
                />
                <span
                  className="absolute right-3 top-10 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700">
                Update Counselor
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditCounselor;