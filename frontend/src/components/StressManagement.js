import stress from "../assets/services/stress.jpg";
import { useNavigate } from "react-router-dom";

function StressManagement() {
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
            Stress Management
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Stress management focuses on helping you identify the sources of stress
            in your life and equipping you with practical techniques to handle them 
            effectively. Through guided sessions, you will learn relaxation strategies, 
            time management skills, and mindfulness practices that promote calmness and 
            clarity. Our goal is to help you reduce overwhelm, improve focus, and maintain a 
            healthier balance between your personal and professional life.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/book")}
            className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Book Appointment
          </button>

        </div>

         {/* Right IMAGES GRID */}
        <div className="flex justify-center md:justify-end">
          
          <img src={stress} alt="" className="w-full max-w-md h-[260px] md:h-[360px] object-cover rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default StressManagement;