import { useState, useEffect } from "react";
import API from "../services/api";
import { FaEdit, FaCamera } from "react-icons/fa";

function CounselorProfile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [stats, setStats] = useState({
    appointments: 0,
    messages: 0
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: ""
  });

  // ================= LOAD USER =================
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      setUser(u);
      setForm({
        name: u.name,
        email: u.email,
        specialization: u.specialization || "",
        experience: u.experience || ""
      });
    }
  }, []);

  // ================= FETCH STATS =================
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/users/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Stats error", err);
    }
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const stored = JSON.parse(localStorage.getItem("user"));
      const userId = stored?._id;

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("profilePic", image);
      }

      const res = await API.put(`/users/${userId}`, formData);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setEdit(false);
      setImage(null);

    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= CHANGE PASSWORD =================
  const handleChangePassword = async () => {
    try {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        return alert("Fill all fields");
      }

      await API.put("/users/change-password", passwordForm);

      alert("Password updated");
      setShowPasswordModal(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (!user) return null;

  const previewImage = image
    ? URL.createObjectURL(image)
    : user.profilePic
      ? `http://localhost:8070/uploads/${user.profilePic}`
      : `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="p-6 flex justify-center">

      <div className="w-full max-w-5xl">

        {/* COVER */}
        <div className="h-28 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl"></div>

        {/* CARD */}
        <div className="bg-white shadow-xl rounded-b-2xl -mt-12 p-6">

          <div className="grid md:grid-cols-3 gap-6">

            {/* ================= LEFT ================= */}
            <div className="flex flex-col items-center text-center">

              <div className="relative">
                <img
                  src={previewImage}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                />

                {edit && (
                  <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
                    <FaCamera />
                    <input type="file" hidden onChange={handleImage} />
                  </label>
                )}
              </div>

              <h2 className="text-lg font-bold mt-3">{user.name}</h2>
              <p className="text-gray-500 text-sm">Counselor</p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 mt-6 w-full">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-lg font-bold">{stats.appointments}</p>
                  <p className="text-xs text-gray-500">Appointments</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-lg font-bold">{stats.messages}</p>
                  <p className="text-xs text-gray-500">Messages</p>
                </div>
              </div>

            </div>

            {/* ================= RIGHT ================= */}
            <div className="md:col-span-2 space-y-4">

              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label className="text-sm text-gray-500 capitalize">
                    {key}
                  </label>

                  <input
                    disabled={!edit}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full border p-2 rounded-lg mt-1"
                  />
                </div>
              ))}

              {/* ACTIONS */}
              <div className="flex justify-between items-center pt-4">

                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="text-sm text-orange-600 font-medium bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  Change Password
                </button>

                {!edit ? (
                  <button
                    onClick={() => setEdit(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setEdit(false)}>
                      Cancel
                    </button>

                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= PASSWORD MODAL ================= */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-[350px] space-y-4">

            <h3 className="text-lg font-semibold">Change Password</h3>

            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value
                })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value
                })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>

              <button
                onClick={handleChangePassword}
                className="bg-orange-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CounselorProfile;