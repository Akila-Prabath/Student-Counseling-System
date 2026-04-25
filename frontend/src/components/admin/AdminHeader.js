import { useState, useRef, useEffect } from "react";
import { FaBell, FaMoon, FaSun, FaBars, FaUser, FaSignOutAlt } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function AdminHeader({ setMobileOpen, collapsed, setCollapsed }) {
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const [admin, setAdmin] = useState(null);

  // 🔥 Fetch admin profile
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await API.get("/admin/profile");
      setAdmin(res.data);
    } catch (err) {
      console.error("Failed to load admin profile", err);
    }
  };

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 🔥 Profile image path
  const profileImage = admin?.profilePic
    ? `http://localhost:8070/uploads/${admin.profilePic}`
    : "https://i.pravatar.cc/40";

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between 
    bg-white/80 backdrop-blur border border-gray-200 
    dark:bg-gray-900/80 p-4 rounded-xl shadow-sm">

      {/* 🔥 LEFT */}
      <div className="flex items-center gap-4">

        {/* MOBILE */}
        <button
          className="md:hidden text-xl text-gray-700 dark:text-white"
          onClick={() => setMobileOpen(true)}
        >
          <FaBars />
        </button>

        {/* COLLAPSE */}
        <button
          className="hidden md:block text-lg text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded-lg hover:scale-105 transition"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars />
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block border p-2 rounded-lg w-64 
          dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* 🔥 RIGHT */}
      <div className="flex items-center gap-4">

        {/* DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-white hover:scale-105 transition"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* NOTIFICATION */}
        <div className="relative">
          <FaBell className="text-gray-600 dark:text-gray-300 text-xl cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* 🔥 PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>

          {/* TRIGGER */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-lg transition"
          >
            <img
              src={profileImage}
              alt="profile"
              className="w-9 h-9 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/40";
              }}
            />

            <span className="hidden sm:block font-medium dark:text-white">
              {admin?.name || "Admin"}
            </span>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">

              {/* USER INFO */}
              <div className="px-4 py-3 border-b dark:border-gray-700">
                <p className="font-semibold text-sm">{admin?.name}</p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>

              {/* MENU */}
              <div className="py-2 text-sm">

                <div
                  onClick={() => navigate("/admin/profile")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <FaUser />
                  My Profile
                </div>

                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-500 cursor-pointer"
                >
                  <FaSignOutAlt />
                  Logout
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminHeader;