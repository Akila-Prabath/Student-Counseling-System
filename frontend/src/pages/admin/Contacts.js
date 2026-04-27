import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaTrash } from "react-icons/fa";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await API.get("/contact");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts");
    }
  };

  // 🔥 DELETE CONTACT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/contact/${id}`);

      // 🔥 update UI instantly
      setContacts((prev) => prev.filter((c) => c._id !== id));

    } catch (error) {
      console.error("Delete failed");
      alert("❌ Failed to delete contact");
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <h2 className="text-2xl font-bold mt-6 mb-6">
          Contact Messages
        </h2>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className="border-b hover:bg-gray-50 cursor-pointer transition"
                >

                  <td className="py-3 font-medium">{c.name}</td>

                  <td>{c.email}</td>

                  <td>{c.phone || "-"}</td>

                  <td className="max-w-xs truncate">
                    {c.message}
                  </td>

                  <td className="text-sm text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  {/* 🔥 DELETE */}
                  <td className="text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 🔥 prevent modal
                        handleDelete(c._id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* EMPTY STATE */}
          {contacts.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No contact messages found
            </p>
          )}

        </div>
      </div>
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedContact.name)}&background=f97316&color=fff`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{selectedContact.name}</h3>
                <p className="text-sm text-gray-500">{selectedContact.email}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="space-y-2 text-sm">

              <p>
                <span className="font-medium text-gray-500">Phone:</span>{" "}
                {selectedContact.phone || "-"}
              </p>

              <p>
                <span className="font-medium text-gray-500">Date:</span>{" "}
                {new Date(selectedContact.createdAt).toLocaleString()}
              </p>

              <div>
                <p className="font-medium text-gray-500 mb-1">Message:</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-gray-700 dark:text-gray-200">
                  {selectedContact.message}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default Contacts;