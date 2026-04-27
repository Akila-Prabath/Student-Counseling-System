import anonymous from "../assets/services/anonymous.jpg";
import { useNavigate } from "react-router-dom";

function AnonymousSupport() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6 md:px-16 bg-gray-100">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-200 text-orange-900 px-4 py-1 rounded-full text-sm mb-4 font-medium">
            Our Services
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Anonymous Support
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Anonymous support allows you to share your concerns and
            seek guidance without revealing your identity. This service is
            ideal for individuals who may feel hesitant or uncomfortable discussing
            sensitive issues openly. By providing a safe and confidential environment,
            we ensure that you can express yourself freely and receive professional advice
            without fear of judgment, helping you take the first step toward healing.</p>

          {/* CTA Button */}
          <div className="flex gap-10">
            <button
              onClick={() => navigate("/Messages")}
              className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
            >
              Send Message
            </button>

            <button
              onClick={() => navigate("/book")}
              className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
            >
              Book Appointment
            </button>
          </div>
        </div>

        {/* Right IMAGES GRID */}
        <div className="flex justify-center md:justify-end">

          <img src={anonymous} alt="" className="w-full h-[260px] md:h-[320px] object-cover object-top rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default AnonymousSupport;