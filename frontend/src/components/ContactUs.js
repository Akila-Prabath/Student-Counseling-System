import officeImg from "../assets/contact/office.jpg";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";
import API from "../services/api";

function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/contact", form);

      setStatus("✅ Message sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      setStatus(error.response?.data?.message || "❌ Failed to send");
    }
  };

  return (
    <div id="contact" className="py-20 px-6 md:px-20 bg-white">

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* 🔹 LEFT SIDE */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-200 text-orange-800 px-4 py-1 rounded-full text-sm mb-4">
            Contact Form
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 max-w-md">
            Whether you have a question, a suggestion, or just want to say hello,
            this is the place to do it. Please fill out the form below and we’ll
            get back to you as soon as possible.
          </p>

          {/* Office */}
          <h3 className="text-xl font-semibold mb-4">Our Office</h3>

          <div className="flex gap-4">

            {/* Image */}
            <div className="relative w-50 h-36 md:h-42 rounded-xl overflow-hidden">
              <img
                src={officeImg}
                alt="Office"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
                Mon - Fri 08.00 - 18.00
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-sm">

              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-black mt-1" />
                <div>
                  <p className="font-semibold">Office Location</p>
                  <p className="text-gray-500">
                    Kurunegala, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FaEnvelope className="text-black mt-1" />
                <div>
                  <p className="font-semibold">Send a Message</p>
                  <p className="text-gray-500">
                    contact@mindcare.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <FaPhone className="text-black mt-1" />
                <div>
                  <p className="font-semibold">Call Us Directly</p>
                  <p className="text-gray-500">
                    +94 71 234 5678
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 🔹 RIGHT SIDE FORM */}
        <div className="bg-orange-100 p-6 md:p-8 rounded-2xl shadow">

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-600"
            />

            <input
              type="text"
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-600"
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-600"
            />

            <textarea
              type="text"
              name="message"
              value={form.message}
              placeholder="Your message"
              onChange={handleChange}
              rows="6"
              className="w-full p-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-orange-600"
            />

            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
            >
              Send Message
            </button>

            {status && (
              <p className="text-sm text-green-600">{status}</p>
            )}

          </form>

        </div>

      </div>
    </div>
  );
}

export default ContactUs;