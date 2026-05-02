import { useEffect, useState } from "react";

import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import API from "../../services/api";

import {
  FaTrash,
  FaPlus
} from "react-icons/fa";

import { toast } from "react-toastify";

import Swal from "sweetalert2";

function Resources() {

  const [resources, setResources] =
    useState([]);

  const [collapsed, setCollapsed] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "article",
    link: ""
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {

    try {

      const res = await API.get(
        "/resources"
      );

      setResources(res.data);

    } catch (error) {

      console.error(
        "Error fetching resources",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load resources"
      );
    }
  };

  // DELETE RESOURCE
  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete Resource?",
      text: "Are you sure you want to delete this resource?",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes",
      cancelButtonText: "No",

      buttonsStyling: false,

      customClass: {
        confirmButton:
          "bg-red-600 text-white px-5 py-2 rounded-lg mx-2 hover:bg-red-700 transition",

        cancelButton:
          "bg-gray-400 text-white px-5 py-2 rounded-lg mx-2 hover:bg-gray-500 transition"
      },

      reverseButtons: true,

      focusConfirm: false,
      focusCancel: false,

      borderRadius: 16
    });

    if (!result.isConfirmed) return;

    try {

      await API.delete(
        `/resources/${id}`
      );

      // UPDATE UI
      setResources((prev) =>
        prev.filter(
          (r) => r._id !== id
        )
      );

      toast.success(
        "Resource deleted successfully"
      );

    } catch (error) {

      console.error(
        "Delete failed",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete resource"
      );
    }
  };

  // ADD RESOURCE
  const handleSubmit = async (e) => {

    e.preventDefault();

    // URL VALIDATION
    try {

      new URL(form.link);

    } catch {

      return toast.error(
        "Please enter a valid URL"
      );
    }

    try {

      const res = await API.post(
        "/resources",
        form
      );

      setResources([
        res.data,
        ...resources
      ]);

      toast.success(
        "Resource added successfully"
      );

      // RESET FORM
      setForm({
        title: "",
        description: "",
        type: "article",
        link: ""
      });

      setShowModal(false);

    } catch (error) {

      console.error(
        "Add failed",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to add resource"
      );
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`${
          collapsed
            ? "ml-20"
            : "ml-64"
        } w-full p-6`}
      >

        <AdminHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* HEADER */}
        <div className="flex justify-between items-center mt-6 mb-6">

          <h2 className="text-2xl font-bold">
            Resources
          </h2>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
          >

            <FaPlus />

            Add Resource

          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b text-gray-500 text-sm">

                <th className="py-3">
                  Title
                </th>

                <th>
                  Type
                </th>

                <th>
                  Created By
                </th>

                <th>
                  Link
                </th>

                <th>
                  Date
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {resources.map((r) => (

                <tr
                  key={r._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3 font-medium">

                    {r.title}

                  </td>

                  <td className="capitalize">

                    {r.type}

                  </td>

                  <td>

                    {r.createdBy?.name ||
                      "N/A"}

                  </td>

                  <td>

                    <a
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>

                  </td>

                  <td className="text-sm text-gray-400">

                    {new Date(
                      r.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* DELETE */}
                  <td className="text-center">

                    <button
                      onClick={() =>
                        handleDelete(
                          r._id
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* EMPTY */}
          {resources.length === 0 && (

            <p className="text-center text-gray-400 py-6">
              No resources found
            </p>

          )}

        </div>

      </div>

      {/* ADD MODAL */}
      {showModal && (

        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <h3 className="text-lg font-semibold mb-4">
              Add Resource
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >

              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title:
                      e.target.value
                  })
                }
                className="w-full p-2 border rounded"
                required
              />

              <textarea
                placeholder="Description"
                value={
                  form.description
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value
                  })
                }
                className="w-full p-2 border rounded"
                required
              />

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type:
                      e.target.value
                  })
                }
                className="w-full p-2 border rounded"
              >

                <option value="article">
                  Article
                </option>

                <option value="video">
                  Video
                </option>

                <option value="guide">
                  Guide
                </option>

              </select>

              <input
                type="url"
                placeholder="Resource link"
                value={form.link}
                onChange={(e) =>
                  setForm({
                    ...form,
                    link:
                      e.target.value
                  })
                }
                className="w-full p-2 border rounded"
                required
              />

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
              >

                Add Resource

              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Resources;