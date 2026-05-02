import { useEffect, useState } from "react";
import API from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
    FaCalendarAlt,
    FaClock
} from "react-icons/fa";

import { toast } from "react-toastify";

function CounselorAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const res = await API.get("/appointments/counselor");

            setAppointments(res.data);

        } catch (err) {

            console.error(err);

            toast.error("Failed to load appointments");
        }
    };

    const updateStatus = async (id, status) => {

        try {

            const res = await API.put(
                `/appointments/${id}/status`,
                { status }
            );

            setAppointments((prev) =>
                prev.map((a) =>
                    a._id === id ? { ...a, status } : a
                )
            );

            toast.success(
                res.data.message || `Appointment ${status}`
            );

        } catch (err) {

            console.error(err);

            toast.error(
                err.response?.data?.message ||
                "Failed to update appointment"
            );
        }
    };

    // FILTER LOGIC
    let list = [...appointments];

    if (filter !== "all") {
        list = list.filter((a) => a.status === filter);
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

    return (
        <div className="min-h-screen bg-zinc-200 p-6">

            <h2 className="text-2xl mt-6 font-bold mb-6">
                My Appointments
            </h2>

            <div className="grid lg:grid-cols-3 gap-6 items-start">

                {/* LEFT SIDE */}
                <div className="lg:col-span-2">

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
                                    ${
                                        filter === f
                                            ? "bg-orange-500 text-white"
                                            : "bg-white border text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {f}
                            </button>

                        ))}

                    </div>

                    {/* APPOINTMENT CARDS */}
                    {list.length === 0 ? (

                        <p className="text-gray-500">
                            No appointments found
                        </p>

                    ) : (

                        <div className="max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">

                            <div className="grid md:grid-cols-2 gap-4">

                                {list.map((appt) => (

                                    <div
                                        key={appt._id}
                                        className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                                    >

                                        <div className="flex gap-4">

                                            {/* PROFILE IMAGE */}
                                            <img
                                                src={
                                                    appt.student?.profilePic
                                                        ? `${
                                                            process.env.REACT_APP_API_URL ||
                                                            "http://localhost:8070"
                                                        }/uploads/${appt.student.profilePic}`
                                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            appt.student?.name || "User"
                                                        )}`
                                                }
                                                alt="student"
                                                className="w-28 h-28 rounded-xl object-cover border"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        "https://i.pravatar.cc/100";
                                                }}
                                            />

                                            {/* INFO */}
                                            <div className="flex-1">

                                                <div className="flex justify-between items-center">

                                                    <h4 className="font-semibold">
                                                        {appt.student?.name}
                                                    </h4>

                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appt.status)}`}
                                                    >
                                                        {appt.status}
                                                    </span>

                                                </div>

                                                <p className="text-sm text-gray-600 mt-2">
                                                    {appt.serviceType}
                                                </p>

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

                                                {/* ACTIONS */}
                                                <div className="flex gap-3 mt-3">

                                                    {appt.status === "pending" && (
                                                        <>

                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        appt._id,
                                                                        "approved"
                                                                    )
                                                                }
                                                                className="flex-1 bg-green-700 text-white py-1 rounded-lg text-sm hover:bg-green-800"
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        appt._id,
                                                                        "rejected"
                                                                    )
                                                                }
                                                                className="flex-1 bg-red-700 text-white py-1 rounded-lg text-sm hover:bg-red-800"
                                                            >
                                                                Reject
                                                            </button>

                                                        </>
                                                    )}

                                                    {appt.status === "approved" && (
                                                        <button
                                                            onClick={() =>
                                                                updateStatus(
                                                                    appt._id,
                                                                    "completed"
                                                                )
                                                            }
                                                            className="w-full bg-blue-700 text-white py-1 rounded-lg text-sm hover:bg-blue-800"
                                                        >
                                                            Complete
                                                        </button>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>
                    )}

                </div>

                {/* CALENDAR */}
                <div className="flex justify-center">

                    <div className="bg-white p-5 rounded-2xl shadow-sm h-fit w-full max-w-sm mx-auto mt-10">

                        <div className="flex justify-between items-center mb-4">

                            <h3 className="font-semibold text-gray-700">
                                Calendar
                            </h3>

                            <select className="border rounded-lg px-3 py-1 text-sm">
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                            </select>

                        </div>

                        <Calendar
                            value={new Date()}
                            onChange={() => {}}
                            className="custom-calendar"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CounselorAppointments;