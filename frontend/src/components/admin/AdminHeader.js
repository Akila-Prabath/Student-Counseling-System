import { FaBell, FaMoon, FaSun, FaBars } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

function AdminHeader({ setMobileOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { dark, setDark } = useTheme();

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl shadow">

      {/* 🔥 LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* ☰ MOBILE MENU */}
        <button
          className="md:hidden text-xl text-gray-700 dark:text-white"
          onClick={() => setMobileOpen(true)}
        >
          <FaBars />
        </button>

        {/* 🔍 SEARCH (HIDDEN ON SMALL) */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block border p-2 rounded-lg w-64 
          dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
      </div>

      {/* 🔥 RIGHT SECTION */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* 🌙 DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-white hover:scale-105 transition"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* 🔔 NOTIFICATION */}
        <div className="relative">
          <FaBell className="text-gray-600 dark:text-gray-300 text-xl cursor-pointer" />

          {/* 🔥 Notification dot */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* 👤 USER */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full"
          />

          {/* Hide name on mobile */}
          <span className="hidden sm:block font-semibold dark:text-white">
            {user?.name}
          </span>
        </div>

      </div>
    </div>
  );
}

export default AdminHeader;