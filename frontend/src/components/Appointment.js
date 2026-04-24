import { useState, useEffect } from "react";
import API from "../services/api";
import bgImg from "../assets/appointment/appointment.jpg";

function BookAppointment() {
  const [form, setForm] = useState({
    counselorId: "",
    serviceType: "",
    date: "",
    timeSlot: "",
    reason: ""
  });

  const [counselors, setCounselors] = useState([]);
  const [message, setMessage] = useState("");

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

    if (!form.serviceType || !form.counselorId || !form.date || !form.timeSlot) {
      return setMessage("❌ Please fill all required fields");
    }

    try {
      const res = await API.post("/appointments", form);

      setMessage(res.data.message || "✅ Appointment booked successfully!");

      setForm({
        counselorId: "",
        serviceType: "",
        date: "",
        timeSlot: "",
        reason: ""
      });

    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Booking failed");
    }
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".service-dropdown")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const [counselorOpen, setCounselorOpen] = useState(false);

  useEffect(() => {
  const handleClickOutside = () => {
    setCounselorOpen(false);
  };

  if (counselorOpen) {
    window.addEventListener("click", handleClickOutside);
  }

  return () => window.removeEventListener("click", handleClickOutside);
}, [counselorOpen]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔥 FORM CONTAINER */}
      <div className="relative w-full max-w-xl ml-auto mr-6 md:mr-20">

        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Book Appointment
          </h2>

          {message && (
            <p className="mb-4 text-sm text-orange-600">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* 🔥 Therapy Type */}
            <div className="relative service-dropdown">
              <label className="text-sm font-semibold">Select Service</label>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 cursor-pointer outline-none focus:ring-2 focus:ring-orange-600 flex justify-between items-center"
              >
                <span>{form.serviceType || "Select Service"}</span>

                <span className={`transition ${dropdownOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {dropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50"
                >
                  {[
                    "Individual Therapy",
                    "Couples Counseling",
                    "Stress Management",
                    "Depression Therapy",
                    "Mental Resources",
                    "Anonymous Support"
                  ].map((service) => (
                    <div
                      key={service}
                      onClick={() => {
                        setForm({ ...form, serviceType: service });
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-200"
                    >
                      {service}
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Counselor */}
            <div className="relative counselor-dropdown">
              <label className="text-sm font-semibold">Select Counselor</label>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCounselorOpen(!counselorOpen);
                }}
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 cursor-pointer flex justify-between items-center"
              >
                <span>
                  {form.counselorId
                    ? counselors.find(c => c._id === form.counselorId)?.name
                    : "Select Counselor"}
                </span>

                <span className={`transition ${counselorOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </div>

              {counselorOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto"
                >
                  {counselors.map((c) => (
                    <div
                      key={c._id}
                      onClick={() => {
                        setForm({ ...form, counselorId: c._id });
                        setCounselorOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-orange-600 hover:text-white cursor-pointer transition"
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-semibold">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-lg bg-stone-300 outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold">Select Time</label>
                <input
                  type="text"
                  name="timeSlot"
                  placeholder="10:00 AM - 11:00 AM"
                  value={form.timeSlot}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-lg bg-stone-300 outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold">Have Any Message?</label>
              <textarea
                name="reason"
                placeholder="Your Message"
                value={form.reason}
                onChange={handleChange}
                rows="5"
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 outline-none focus:ring-2 focus:ring-orange-600"
                required
              />
            </div>

            {/* Button */}
            <button className="bg-orange-700 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
              Send Appointment
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;