import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    fetchAppointments(storedUser);
  }, []);

  const fetchAppointments = async (user) => {
    try {
      let res;

      if (user.role === "student") {
        res = await API.get("/appointments/student");
      } else if (user.role === "counselor") {
        res = await API.get("/appointments/counselor");
      }

      setAppointments(res.data);

    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-green-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MindCare Dashboard</h1>

        <div className="flex items-center gap-4">
          <span>{user.name}</span>
          <button
            onClick={logout}
            className="bg-white text-green-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">

        <h2 className="text-2xl font-bold mb-6">
          Welcome, {user.name} 👋
        </h2>

        {/* APPOINTMENTS */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">
            Your Appointments
          </h3>

          {appointments.length === 0 ? (
            <p className="text-gray-500">No appointments found</p>
          ) : (
            <div className="space-y-4">

              {appointments.map((appt) => (
                <div
                  key={appt._id}
                  className="border p-4 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {user.role === "student"
                        ? appt.counselor?.name
                        : appt.student?.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {appt.date} | {appt.timeSlot}
                    </p>

                    <p className="text-sm text-gray-500">
                      {appt.reason}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-sm ${appt.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : appt.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {appt.status || "pending"}
                  </span>
                </div>
              ))}
              <button
                onClick={() => (window.location.href = "/book")}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;