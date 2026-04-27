import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";

function ViewCounselors() {
  const [counselors, setCounselors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const counselorsPerPage = 5;

  const indexOfLast = currentPage * counselorsPerPage;
  const indexOfFirst = indexOfLast - counselorsPerPage;
  const currentCounselors = counselors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(counselors.length / counselorsPerPage);

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const res = await API.get("/users/counselors");
      setCounselors(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Error fetching counselors");
    }
  };

  // 🔍 SEARCH
  useEffect(() => {
    const result = counselors.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.specialization || "").toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, counselors]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this counselor?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);
      setCounselors(counselors.filter((c) => c._id !== id));
    } catch {
      alert("❌ Failed to delete");
    }
  };

  // ✏ EDIT
  const handleEdit = (id) => {
    window.location.href = `/admin/counselors/edit/${id}`;
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader

          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="flex justify-between items-center mt-6 mb-6">
          <h2 className="text-2xl font-bold">All Counselors</h2>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search counselors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-lg w-64"
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Counselor</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                currentCounselors.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">

                    {/* Profile */}
                    <td className="py-3 flex items-center gap-3">
                      <img
                        src={
                          c.profilePic
                            ? `http://localhost:8070/uploads/${c.profilePic}`
                            : "https://i.pravatar.cc/40"
                        }
                        onError={(e) => {
                          e.target.src = "https://i.pravatar.cc/40";
                        }}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-medium">{c.name}</span>
                    </td>

                    <td>{c.email}</td>

                    <td>{c.specialization || "-"}</td>

                    <td>{c.experience || "-"}</td>

                    <td>{c.phone || "-"}</td>

                    {/* Actions */}
                    <td className="text-center space-x-3">
                      <button
                        onClick={() => handleEdit(c._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No counselors found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
          <div className="flex justify-center mt-6 space-x-2">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
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

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewCounselors;