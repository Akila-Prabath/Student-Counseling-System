import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUserTie,
  FaCalendar,
  FaSignOutAlt,
  FaChevronDown,
  FaHome
} from "react-icons/fa";
import { FaFile, FaMessage, FaPhone } from "react-icons/fa6";
import { useEffect } from "react";

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isStudentsActive = location.pathname.startsWith("/admin/students");
  const isCounselorActive = location.pathname.startsWith("/admin/counselors");
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (isStudentsActive) {
      setOpenMenu("students");
    }
    if (isCounselorActive) {
      setOpenMenu("counselors");
    }
  }, [location.pathname]);

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
        className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
         bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800
        border-r border-orange-100 dark:border-gray-700`}
      >
        <div className="p-5">

          {/* 🔥 LOGO */}
          <h1 className="text-xl font-semibold mb-8 text-orange-600 tracking-tight">
            {collapsed ? "MC" : "MindCare"}
          </h1>

          {/* 🔥 MENU */}
          <div className="space-y-2">

            {/* ITEM */}
            {[
              { name: "Dashboard", icon: <FaUser />, path: "/admin" },
              { name: "Appointments", icon: <FaCalendar />, path: "/admin/appointments" },
              { name: "Resources", icon: <FaFile />, path: "/admin/resources" },
              { name: "Messages", icon: <FaMessage />, path: "/admin/messages" },
              { name: "Contacts", icon: <FaPhone />, path: "/admin/contacts" },
            ].map((item) => {
              const active = location.pathname === item.path;

              return (
                <div
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
            ${active
                      ? "bg-orange-100 text-orange-600 shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700"
                    }`}
                >
                  {/* ICON BOX */}
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-lg
              ${active ? "bg-orange-200" : "bg-gray-100 dark:bg-gray-700"}`}
                  >
                    {item.icon}
                  </div>

                  {!collapsed && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </div>
              );
            })}

            {/* 🔥 DROPDOWN MENUS */}

            {/* STUDENTS */}
            <div>
              <div
                onClick={() => toggleMenu("students")}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition
                  ${isStudentsActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg 
                  ${isStudentsActive ? "bg-orange-200" : "bg-gray-100 dark:bg-gray-700"}`}>
                    <FaUser />
                  </div>
                  {!collapsed && <span className="text-sm font-medium">Students</span>}
                </div>

                {!collapsed && (
                  <FaChevronDown
                    className={`transition ${openMenu === "students" ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {!collapsed && openMenu === "students" && (
                <div className="ml-10 mt-2 space-y-1 text-sm">
                  <div
                    onClick={() => navigate("/admin/students")}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                    ${location.pathname === "/admin/students"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-orange-50"
                      }`}
                  >
                    All Students
                  </div>

                  <div
                    onClick={() => navigate("/admin/students/add")}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                      ${location.pathname === "/admin/students/add"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-orange-50"
                      }`}
                  >
                    Add Student
                  </div>
                </div>
              )}
            </div>

            {/* COUNSELORS */}
            <div>
              <div
                onClick={() => toggleMenu("counselors")}
                className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition
                  ${isCounselorActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg 
                  ${isCounselorActive ? "bg-orange-200" : "bg-gray-100 dark:bg-gray-700"}`}>
                    <FaUserTie />
                  </div>
                  {!collapsed && <span className="text-sm font-medium">Counselors</span>}
                </div>

                {!collapsed && (
                  <FaChevronDown
                    className={`transition ${openMenu === "counselors" ? "rotate-180" : ""}`}
                  />
                )}
              </div>

              {!collapsed && openMenu === "counselors" && (
                <div className="ml-10 mt-2 space-y-1 text-sm">
                  <div
                    onClick={() => navigate("/admin/counselors")}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                      ${location.pathname === "/admin/counselors"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-orange-50"
                      }`}
                  >
                    All Counselors
                  </div>

                  <div
                    onClick={() => navigate("/admin/counselors/add")}
                    className={`px-3 py-2 rounded-lg cursor-pointer
                      ${location.pathname === "/admin/counselors/add"
                        ? "bg-orange-100 text-orange-600"
                        : "hover:bg-orange-50"
                      }`}
                  >
                    Add Counselor
                  </div>
                </div>
              )}
            </div>

          </div>


          {/* 🔥 BOTTOM ACTIONS */}
          <div className="mt-10 pt-6 border-t border-orange-100 dark:border-gray-700 space-y-2">

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-orange-50 cursor-pointer"
            >
              <FaHome />
              {!collapsed && <span className="text-sm">Home</span>}
            </div>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 cursor-pointer"
            >
              <FaSignOutAlt />
              {!collapsed && <span className="text-sm">Logout</span>}
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Sidebar;