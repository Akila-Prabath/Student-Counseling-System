import { FaBell, FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

function AdminHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { dark, setDark } = useTheme();

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-xl shadow">

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-lg w-1/3 dark:bg-gray-800 dark:text-white"
      />

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* 🌙 DARK MODE BUTTON */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        <FaBell className="text-gray-600 dark:text-gray-300 text-xl" />

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold dark:text-white">
            {user?.name}
          </span>
        </div>

      </div>
    </div>
  );
}

export default AdminHeader;