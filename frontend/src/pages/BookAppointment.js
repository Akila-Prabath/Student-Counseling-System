import { useState, useEffect } from "react";
import API from "../services/api";

function BookAppointment() {
  const [form, setForm] = useState({
    counselorID: "",
    date: "",
    timeSlot: "",
    reason: ""
  });

  const [counselors, setCounselors] = useState([]);
  const [message, setMessage] = useState("");

  // 🔥 Fetch counselors
  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const res = await API.get("/users/counselors");
      setCounselors(res.data);
    } catch (error) {
      console.error("Error fetching counselors", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/appointments", form);

      setMessage(res.data.message || "✅ Appointment booked successfully!");

      setForm({
        counselorID: "",
        date: "",
        timeSlot: "",
        reason: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Book Appointment
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* 🔥 Counselor Dropdown */}
          <select
            name="counselorID"
            value={form.counselorID}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Counselor</option>

            {counselors.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Time Slot */}
          <input
            type="text"
            name="timeSlot"
            placeholder="e.g. 10:00 AM - 11:00 AM"
            value={form.timeSlot}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Reason */}
          <textarea
            name="reason"
            placeholder="Reason for appointment"
            value={form.reason}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* Submit */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
            Book Appointment
          </button>

        </form>

      </div>
    </div>
  );
}

export default BookAppointment;