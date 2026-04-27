import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = students.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(students.length / studentsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [students]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/users/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students");
    }
  };

  // 🔥 DELETE STUDENT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      setStudents(students.filter((s) => s._id !== id));
    } catch (error) {
      alert("❌ Failed to delete student");
    }
  };

  // 🔥 EDIT (redirect)
  const handleEdit = (id) => {
    window.location.href = `/admin/students/edit/${id}`;
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader

          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <h2 className="text-2xl font-bold mt-6 mb-6">
          All Students
        </h2>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Student</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">

                  {/* 🔥 PROFILE + NAME */}
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={
                        s.profilePic
                          ? `http://localhost:8070/uploads/${s.profilePic}`
                          : "https://i.pravatar.cc/40"
                      }
                      onError={(e) => {
                        e.target.src = "https://i.pravatar.cc/40";
                      }}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{s.name}</span>
                  </td>

                  <td>{s.email}</td>

                  <td className="capitalize">{s.role}</td>

                  {/* 🔥 ACTIONS */}
                  <td className="text-center space-x-3">

                    <button
                      onClick={() => handleEdit(s._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
          <div className="flex justify-center mt-6 space-x-2">

            {/* Prev */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              Next
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewStudents;