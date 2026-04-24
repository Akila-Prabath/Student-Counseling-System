import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserTie,
  FaCalendar,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
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
    <>
      {/* 🔥 OVERLAY (MOBILE) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 border-r z-50
        transition-all duration-300

        ${collapsed ? "w-20" : "w-64"}

        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="p-5">

          {/* 🔥 MOBILE CLOSE */}
          <button
            className="md:hidden mb-4 text-xl"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          {/* 🔥 COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ☰
          </button>

          {/* 🔥 LOGO */}
          <h1 className="text-xl font-bold mb-10 text-orange-600">
            {collapsed ? "MC" : "MindCare"}
          </h1>

          {/* 🔥 DASHBOARD */}
          <div
            onClick={() => navigate("/admin")}
            className={`relative flex items-center gap-3 p-2 rounded-lg cursor-pointer group
            ${
              location.pathname === "/admin"
                ? "bg-orange-200 text-orange-800"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }
          `}
          >
            {location.pathname === "/admin" && (
              <span className="absolute left-0 top-0 h-full w-1 bg-orange-600 rounded-r"></span>
            )}

            <FaUser />
            {!collapsed && <span>Dashboard</span>}

            {collapsed && (
              <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                Dashboard
              </span>
            )}
          </div>

          {/* 🔥 STUDENTS */}
          <div className="mt-4">
            <div
              onClick={() => toggleMenu("students")}
              className={`relative flex items-center justify-between p-2 rounded-lg cursor-pointer group
              ${
                location.pathname.startsWith("/admin/students")
                  ? "bg-orange-200 text-orange-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
            >
              {location.pathname.startsWith("/admin/students") && (
                <span className="absolute left-0 top-0 h-full w-1 bg-orange-600 rounded-r"></span>
              )}

              <div className="flex items-center gap-3">
                <FaUser />
                {!collapsed && <span>Students</span>}
              </div>

              {!collapsed && (
                <FaChevronDown
                  className={`transition ${
                    openMenu === "students" ? "rotate-180" : ""
                  }`}
                />
              )}

              {collapsed && (
                <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                  Students
                </span>
              )}
            </div>

            {!collapsed && openMenu === "students" && (
              <div className="ml-6 mt-3 space-y-1 text-sm">
                <div
                  onClick={() => navigate("/admin/students")}
                  className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer"
                >
                  All Students
                </div>
                <div
                  onClick={() => navigate("/admin/students/add")}
                  className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer"
                >
                  Add Student
                </div>
              </div>
            )}
          </div>

          {/* 🔥 COUNSELORS */}
          <div className="mt-4">
            <div
              onClick={() => toggleMenu("counselors")}
              className={`relative flex items-center justify-between p-2 rounded-lg cursor-pointer group
              ${
                location.pathname.startsWith("/admin/counselors")
                  ? "bg-orange-200 text-orange-800"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }
            `}
            >
              {location.pathname.startsWith("/admin/counselors") && (
                <span className="absolute left-0 top-0 h-full w-1 bg-orange-600 rounded-r"></span>
              )}

              <div className="flex items-center gap-3">
                <FaUserTie />
                {!collapsed && <span>Counselors</span>}
              </div>

              {!collapsed && (
                <FaChevronDown
                  className={`transition ${
                    openMenu === "counselors" ? "rotate-180" : ""
                  }`}
                />
              )}

              {collapsed && (
                <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                  Counselors
                </span>
              )}
            </div>

            {!collapsed && openMenu === "counselors" && (
              <div className="ml-6 mt-3 space-y-1 text-sm">
                <div
                  onClick={() => navigate("/admin/counselors")}
                  className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer"
                >
                  All Counselors
                </div>
                <div
                  onClick={() => navigate("/admin/counselors/add")}
                  className="px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer"
                >
                  Add Counselor
                </div>
              </div>
            )}
          </div>

          {/* 🔥 APPOINTMENTS */}
          <div
            onClick={() => navigate("/admin/appointments")}
            className="flex items-center gap-3 mt-5 p-2 rounded-lg hover:bg-gray-100 cursor-pointer group"
          >
            <FaCalendar />
            {!collapsed && <span>Appointments</span>}
          </div>

          {/* 🔥 LOGOUT */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 p-2 rounded-lg hover:bg-red-100 text-red-500 cursor-pointer"
          >
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </div>

        </div>
      </div>
    </>
  );
}

export default Sidebar;