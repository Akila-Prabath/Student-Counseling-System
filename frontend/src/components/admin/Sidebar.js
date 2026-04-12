import { useState } from "react";
import { FaUser, FaUserTie, FaCalendar, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [openMenu, setOpenMenu] = useState("");
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-stone-900 text-white p-5 fixed">

      <h1 className="text-xl font-bold mb-8 text-orange-500">
        Admin Panel
      </h1>

      {/* STUDENTS */}
      <div>
        <div
          onClick={() => toggleMenu("students")}
          className="flex items-center gap-3 cursor-pointer p-2 hover:bg-stone-800 rounded"
        >
          <FaUser /> Students
        </div>

        {openMenu === "students" && (
          <div className="ml-6 mt-2 space-y-2 text-sm">
            <p onClick={() => navigate("/admin/students/add")} className="cursor-pointer hover:text-orange-400">
              Add Student
            </p>
            <p onClick={() => navigate("/admin/students")} className="cursor-pointer hover:text-orange-400">
              View Students
            </p>
          </div>
        )}
      </div>

      {/* COUNSELORS */}
      <div className="mt-4">
        <div
          onClick={() => toggleMenu("counselors")}
          className="flex items-center gap-3 cursor-pointer p-2 hover:bg-stone-800 rounded"
        >
          <FaUserTie /> Counselors
        </div>

        {openMenu === "counselors" && (
          <div className="ml-6 mt-2 space-y-2 text-sm">
            <p onClick={() => navigate("/admin/counselors/add")} className="cursor-pointer hover:text-orange-400">
              Add Counselor
            </p>
            <p onClick={() => navigate("/admin/counselors")} className="cursor-pointer hover:text-orange-400">
              View Counselors
            </p>
          </div>
        )}
      </div>

      {/* APPOINTMENTS */}
      <div
        onClick={() => navigate("/admin/appointments")}
        className="flex items-center gap-3 cursor-pointer p-2 hover:bg-stone-800 rounded mt-4"
      >
        <FaCalendar /> Appointments
      </div>

      {/* LOGOUT */}
      <div
        onClick={handleLogout}
        className="flex items-center gap-3 cursor-pointer p-2 hover:bg-red-600 rounded mt-6"
      >
        <FaSignOutAlt /> Logout
      </div>

    </div>
  );
}

export default Sidebar;