import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaTrash } from "react-icons/fa";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages");
    }
  };

  // 🔥 DELETE MESSAGE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this message?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Delete failed");
      alert("❌ Failed to delete message");
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-orange-50 to-orange-300 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6`}>

        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <h2 className="text-2xl font-bold mt-6 mb-6">
          Anonymous Messages
        </h2>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Sender</th>
                <th>Receiver</th>
                <th>Message</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {messages.map((m) => (
                <tr
                  key={m._id}
                  onClick={() => setSelectedMessage(m)}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >

                  {/* SENDER */}
                  <td className="py-3 flex items-center gap-3">
                    {m.sender?.name || "Anonymous"}
                  </td>

                  {/* RECEIVER */}
                  <td>
                    {m.receiver?.name || "N/A"}
                  </td>

                  {/* MESSAGE PREVIEW */}
                  <td className="max-w-xs truncate">
                    {m.content}
                  </td>

                  {/* DATE */}
                  <td className="text-sm text-gray-400">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </td>

                  {/* DELETE */}
                  <td
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {messages.length === 0 && (
            <p className="text-center text-gray-400 py-6">
              No messages found
            </p>
          )}

        </div>
      </div>

      {/* 🔥 MODAL */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Message Details
              </h3>
              <p className="text-sm text-gray-400">
                {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>

            {/* INFO */}
            <div className="space-y-2 text-sm">

              <p>
                <span className="font-medium text-gray-500">Sender:</span>{" "}
                {selectedMessage.sender?.name || "Anonymous"}
              </p>

              <p>
                <span className="font-medium text-gray-500">Receiver:</span>{" "}
                {selectedMessage.receiver?.name || "N/A"}
              </p>

              <div>
                <p className="font-medium text-gray-500 mb-1">Message:</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  {selectedMessage.content}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Messages;