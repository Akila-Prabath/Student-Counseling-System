import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaCalendarAlt,
  FaClock,
  FaPlus
} from "react-icons/fa";

import { toast } from "react-toastify";
import Swal from "sweetalert2";

function ShowAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);

  const [selectedAppt, setSelectedAppt] =
    useState(null);

  const [form, setForm] = useState({
    counselorId: "",
    date: "",
    timeSlot: ""
  });

  const [counselors, setCounselors] = useState([]);

  useEffect(() => {

    fetchAppointments();

    fetchCounselors();

  }, []);

  const fetchCounselors = async () => {

    try {

      const res = await API.get(
        "/users/counselors"
      );

      setCounselors(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load counselors");
    }
  };

  const fetchAppointments = async () => {

    try {

      const res = await API.get(
        "/appointments/student"
      );

      setAppointments(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load appointments");
    }
  };

  // CANCEL
  const cancelAppointment = async (id) => {

    const result = await Swal.fire({
      title: "Cancel Appointment?",
      text: "Are you sure you want to cancel this appointment?",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes",
      cancelButtonText: "No",

      buttonsStyling: false,

      customClass: {
        confirmButton:
          "bg-red-600 text-white px-5 py-2 rounded-lg mx-2 hover:bg-red-700 transition",

        cancelButton:
          "bg-gray-600 text-white px-5 py-2 rounded-lg mx-2 hover:bg-gray-700 transition"
      },

      reverseButtons: true,

      focusConfirm: false,
      focusCancel: false,

      borderRadius: 16
    });

    if (!result.isConfirmed) return;

    try {

      const res = await API.delete(
        `/appointments/${id}`
      );

      // Remove instantly from UI
      setAppointments((prev) =>
        prev.filter((a) => a._id !== id)
      );

      toast.success(
        res.data.message ||
        "Appointment cancelled"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to cancel appointment"
      );
    }
  };

  // RESCHEDULE MODAL
  const reschedule = (appt) => {

    setSelectedAppt(appt);

    setForm({
      counselorId:
        appt.counselor?._id || "",

      date:
        appt.date?.split("T")[0] || "",

      timeSlot:
        appt.timeSlot || ""
    });

    setShowModal(true);
  };

  // FILTER
  let list = [...appointments];

  if (filter !== "all") {
    list = list.filter(
      (a) => a.status === filter
    );
  }

  const getStatusColor = (status) => {

    switch (status) {

      case "approved":
        return "bg-green-100 text-green-600";

      case "rejected":
        return "bg-red-100 text-red-600";

      case "completed":
        return "bg-blue-100 text-blue-600";

      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  // SAVE RESCHEDULE
  const handleSave = async () => {

    if (
      !form.counselorId ||
      !form.date ||
      !form.timeSlot
    ) {
      return toast.error(
        "Please fill all fields"
      );
    }

    try {

      const res = await API.put(
        `/appointments/${selectedAppt._id}/reschedule`,
        form
      );

      toast.success(
        res.data.message ||
        "Appointment rescheduled"
      );

      setShowModal(false);

      fetchAppointments();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to reschedule"
      );
    }
  };

  return (
    <div className="min-h-screen bg-orange-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold mt-2">
          My Appointments
        </h2>

        <button
          onClick={() =>
            (window.location.href = "/book")
          }
          className="flex items-center gap-2 bg-orange-700 text-white mt-8 px-3 py-2 rounded-lg hover:bg-orange-900"
        >

          <FaPlus />

          New Appointment

        </button>

      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4 flex-wrap">

        {[
          "all",
          "pending",
          "approved",
          "completed",
          "rejected"
        ].map((f) => (

          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm capitalize transition
              ${filter === f
                ? "bg-orange-600 text-white"
                : "bg-white border text-gray-600 hover:bg-gray-200"
              }`}
          >
            {f}
          </button>

        ))}

      </div>

      {/* CARDS */}
      {list.length === 0 ? (

        <p className="text-gray-500">
          No appointments found
        </p>

      ) : (

        <div className="max-h-[420px] overflow-y-auto pr-2">

          <div className="grid md:grid-cols-3 gap-4">

            {list.map((appt) => (

              <div
                key={appt._id}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-center gap-3 mb-2">

                  <div className="relative">

                    {/* COUNSELOR IMAGE */}
                    <img
                      src={
                        appt.counselor?.profilePic
                          ? `${process.env.REACT_APP_API_URL ||
                          "http://localhost:8070"
                          }/uploads/${appt.counselor.profilePic}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            appt.counselor?.name ||
                            "Counselor"
                          )}`
                      }
                      alt="counselor"
                      className="w-12 h-12 rounded-full object-cover border"
                      onError={(e) => {
                        e.target.onerror = null;

                        e.target.src =
                          "https://i.pravatar.cc/100";
                      }}
                    />

                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>

                  </div>

                  {/* INFO */}
                  <div>

                    <h4 className="font-semibold text-sm">
                      {appt.counselor?.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {appt.serviceType}
                    </p>

                  </div>

                </div>

                {/* DATE + TIME */}
                <p className="text-sm text-gray-500 mt-3 flex items-center gap-4">

                  <span className="flex items-center gap-1">

                    <FaCalendarAlt className="text-gray-400 text-xs" />

                    {new Date(
                      appt.date
                    ).toLocaleDateString()}

                  </span>

                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>

                  <span className="flex items-center gap-1">

                    <FaClock className="text-gray-400 text-xs" />

                    {appt.timeSlot}

                  </span>

                </p>

                {/* STATUS */}
                <span
                  className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${getStatusColor(
                    appt.status
                  )}`}
                >
                  {appt.status}
                </span>

                {/* ACTIONS */}
                {(appt.status === "pending" ||
                  appt.status === "rejected") && (

                    <div className="flex gap-2 mt-4">

                      <button
                        onClick={() =>
                          cancelAppointment(appt._id)
                        }
                        className="flex-1 bg-red-700 text-white py-1 rounded-lg text-sm hover:bg-red-800"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() =>
                          reschedule(appt)
                        }
                        className="flex-1 bg-blue-700 text-white py-1 rounded-lg text-sm hover:bg-blue-800"
                      >
                        Reschedule
                      </button>

                    </div>
                  )}

              </div>

            ))}

          </div>

        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-2xl w-[400px] shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              Reschedule Appointment
            </h3>

            {/* COUNSELOR */}
            <select
              className="w-full border p-2 rounded mb-3"
              value={form.counselorId}
              onChange={(e) =>
                setForm({
                  ...form,
                  counselorId:
                    e.target.value
                })
              }
            >

              <option value="">
                Select Counselor
              </option>

              {counselors.map((c) => (

                <option
                  key={c._id}
                  value={c._id}
                >
                  {c.name}
                </option>

              ))}

            </select>

            {/* DATE */}
            <input
              type="date"
              className="w-full border p-2 rounded mb-3"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
            />

            {/* TIME */}
            <select
              className="w-full border p-2 rounded mb-4"
              value={form.timeSlot}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeSlot: e.target.value
                })
              }
            >

              <option value="">
                Select Time
              </option>

              <option>
                9:00 AM - 10:00 AM
              </option>

              <option>
                10:00 AM - 11:00 AM
              </option>

              <option>
                11:00 AM - 12:00 PM
              </option>

              <option>
                2:00 PM - 3:00 PM
              </option>

              <option>
                3:00 PM - 4:00 PM
              </option>

              <option>
                4:00 PM - 5:00 PM
              </option>

            </select>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-4 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-1 bg-orange-500 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ShowAppointments;