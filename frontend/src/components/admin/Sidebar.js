import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUser,
  FaUserTie,
  FaCalendar,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 text-black dark:text-white border-r fixed p-5">

      {/* Logo */}
      <h1 className="text-xl font-bold mb-10 text-orange-600">
        MindCare Admin
      </h1>

      {/* Dashboard */}
      <div
  onClick={() => navigate("/admin")}
  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition
    ${
      location.pathname === "/admin"
        ? "bg-orange-200 text-orange-800"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }
  `}
>
  <div className="flex items-center gap-3">
    <FaUser />
    <span>Dashboard</span>
  </div>
</div>

      {/* Students */}
      <div className="mt-4">
        <div
          onClick={() => toggleMenu("students")}
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition 
        ${openMenu === "students"
              ? "bg-orange-100 text-orange-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }
             ${
      location.pathname.startsWith("/admin/students")
        ? "bg-orange-200 text-orange-800"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }
        `}
        >
          <div className="flex items-center gap-3">
            <FaUser />
            <span>Students</span>
          </div>

          <FaChevronDown
            className={`transition ${openMenu === "students" ? "rotate-180" : ""
              }`}
          />
        </div>

        {openMenu === "students" && (
          <div className="ml-6 mt-3 space-y-1 text-sm">

            {/* Add Student */}
            <div
              onClick={() => navigate("/admin/students/add")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
      text-gray-600 dark:text-gray-300 
      hover:bg-orange-50 dark:hover:bg-gray-800 
      hover:text-orange-600 transition"
            >

              <span>Add Student</span>
            </div>

            {/* View Students */}
            <div
              onClick={() => navigate("/admin/students")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
      text-gray-600 dark:text-gray-300 
      hover:bg-orange-50 dark:hover:bg-gray-800 
      hover:text-orange-600 transition"
            >

              <span>All Students</span>
            </div>

            {/* Student Reports */}
            <div
              onClick={() => navigate("/admin/students/reports")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
      text-gray-600 dark:text-gray-300 
      hover:bg-orange-50 dark:hover:bg-gray-800 
      hover:text-orange-600 transition"
            >

              <span>Reports</span>
            </div>

          </div>
        )}
      </div>

      {/* Counselors */}
      <div className="mt-4">

        {/* 🔹 Main Item */}
        <div
          onClick={() => toggleMenu("counselors")}
          className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition
      ${openMenu === "counselors"
              ? "bg-orange-100 text-orange-700 dark:bg-orange-100 dark:text-orange-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }
            ${
      location.pathname.startsWith("/admin/counselors")
        ? "bg-orange-200 text-orange-800"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }
    `}
        >
          <div className="flex items-center gap-3">
            <FaUserTie />
            <span>Counselors</span>
          </div>

          <FaChevronDown
            className={`transition ${openMenu === "counselors" ? "rotate-180" : ""
              }`}
          />
        </div>

        {/* 🔹 Dropdown */}
        {openMenu === "counselors" && (
          <div className="ml-6 mt-3 space-y-1 text-sm">

            {/* Add Counselor */}
            <div
              onClick={() => navigate("/admin/counselors/add")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
        text-gray-600 dark:text-gray-300 
        hover:bg-orange-50 dark:hover:bg-gray-800 
        hover:text-orange-600 transition"
            >
             
              <span>Add Counselor</span>
            </div>

            {/* View Counselors */}
            <div
              onClick={() => navigate("/admin/counselors")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
        text-gray-600 dark:text-gray-300 
        hover:bg-orange-50 dark:hover:bg-gray-800 
        hover:text-orange-600 transition"
            >
              
              <span>All Counselors</span>
            </div>

            {/* Reports */}
            <div
              onClick={() => navigate("/admin/counselors/reports")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer 
        text-gray-600 dark:text-gray-300 
        hover:bg-orange-50 dark:hover:bg-gray-800 
        hover:text-orange-600 transition"
            >
              
              <span>Reports</span>
            </div>

          </div>
        )}
      </div>

      {/* Appointments */}
      <div
        onClick={() => navigate("/admin/appointments")}
        className="flex items-center gap-3 p-2 mt-4 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <FaCalendar />
        <span>Appointments</span>
      </div>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-3 p-2 mt-10 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;