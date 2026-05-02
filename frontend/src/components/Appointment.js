import { useState, useEffect } from "react";
import API from "../services/api";
import bgImg from "../assets/appointment/appointments.jpg";

import { toast } from "react-toastify";

function BookAppointment() {

  const [form, setForm] = useState({
    counselorId: "",
    serviceType: "",
    date: "",
    timeSlot: "",
    reason: ""
  });

  const [counselors, setCounselors] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [counselorOpen, setCounselorOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const res = await API.get("/users/counselors");
      setCounselors(res.data);
    } catch (error) {
      console.error("Error fetching counselors", error);

      toast.error("Failed to load counselors");
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

    // Validation
    if (
      !form.serviceType ||
      !form.counselorId ||
      !form.date ||
      !form.timeSlot
    ) {
      return toast.error("Please fill all required fields");
    }

    try {

      const res = await API.post("/appointments", form);

      toast.success(
        res.data.message || "Appointment booked successfully!"
      );

      // Reset form
      setForm({
        counselorId: "",
        serviceType: "",
        date: "",
        timeSlot: "",
        reason: ""
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Booking failed"
      );
    }
  };

  // Close service dropdown
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (!e.target.closest(".service-dropdown")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () =>
      window.removeEventListener("click", handleClickOutside);

  }, [dropdownOpen]);

  // Close counselor dropdown
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (!e.target.closest(".counselor-dropdown")) {
        setCounselorOpen(false);
      }
    };

    if (counselorOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () =>
      window.removeEventListener("click", handleClickOutside);

  }, [counselorOpen]);

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (!e.target.closest(".time-dropdown")) {
        setTimeOpen(false);
      }
    };

    if (timeOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () =>
      window.removeEventListener("click", handleClickOutside);

  }, [timeOpen]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-xl ml-auto mr-6 md:mr-20">

        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold mb-6">
            Book Appointment
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Service */}
            <div className="relative service-dropdown">

              <label className="text-sm font-semibold">
                Select Service
              </label>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 cursor-pointer flex justify-between items-center"
              >

                <span>
                  {form.serviceType || "Select Service"}
                </span>

                <span
                  className={`transition ${dropdownOpen ? "rotate-180" : ""
                    }`}
                >
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
                        setForm({
                          ...form,
                          serviceType: service
                        });

                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-orange-600 hover:text-white cursor-pointer transition"
                    >
                      {service}
                    </div>

                  ))}

                </div>
              )}
            </div>

            {/* Counselor */}
            <div className="relative counselor-dropdown">

              <label className="text-sm font-semibold">
                Select Counselor
              </label>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCounselorOpen(!counselorOpen);
                }}
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 cursor-pointer flex justify-between items-center"
              >

                <span>
                  {form.counselorId
                    ? counselors.find(
                      (c) => c._id === form.counselorId
                    )?.name
                    : "Select Counselor"}
                </span>

                <span
                  className={`transition ${counselorOpen ? "rotate-180" : ""
                    }`}
                >
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
                        setForm({
                          ...form,
                          counselorId: c._id
                        });

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
                <label className="text-sm font-semibold">
                  Select Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 rounded-lg bg-stone-300 outline-none focus:ring-2 focus:ring-orange-600"
                  required
                />
              </div>

              {/* Time Dropdown */}
              <div className="relative time-dropdown">

                <label className="text-sm font-semibold">
                  Select Time
                </label>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeOpen(!timeOpen);
                  }}
                  className="w-full mt-1 p-3 rounded-lg bg-stone-300 cursor-pointer flex justify-between items-center"
                >

                  <span>
                    {form.timeSlot || "Select Time Slot"}
                  </span>

                  <span
                    className={`transition ${timeOpen ? "rotate-180" : ""
                      }`}
                  >
                    ▼
                  </span>

                </div>

                {timeOpen && (

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto"
                  >

                    {[
                      "8:00 AM - 9:00 AM",
                      "9:00 AM - 10:00 AM",
                      "10:00 AM - 11:00 AM",
                      "11:00 AM - 12:00 PM",
                      "1:00 PM - 2:00 PM",
                      "2:00 PM - 3:00 PM",
                      "3:00 PM - 4:00 PM",
                      "4:00 PM - 5:00 PM",
                      "5:00 PM - 6:00 PM",
                      "6:00 PM - 7:00 PM",
                      "7:00 PM - 8:00 PM",
                      "8:00 PM - 9:00 PM"
                    ].map((time) => (

                      <div
                        key={time}
                        onClick={() => {
                          setForm({
                            ...form,
                            timeSlot: time
                          });

                          setTimeOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-orange-600 hover:text-white cursor-pointer transition"
                      >
                        {time}
                      </div>

                    ))}

                  </div>
                )}

              </div>

            </div>

            {/* Message */}
            <div>

              <label className="text-sm font-semibold">
                Have Any Message? (Optional)
              </label>

              <textarea
                name="reason"
                placeholder="Your Message"
                value={form.reason}
                onChange={handleChange}
                rows="5"
                className="w-full mt-1 p-3 rounded-lg bg-stone-300 outline-none focus:ring-2 focus:ring-orange-600"
              />

            </div>

            {/* Button */}
            <button
              className="bg-orange-700 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
            >
              Send Appointment
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default BookAppointment;