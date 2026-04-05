import stress from "../assets/services/stress.jpg";

//import { FaStar } from "react-icons/fa";

function StressManagement() {
  return (
    <div className="py-20 px-6 md:px-20 bg-gray-100">

      <div className="grid md:grid-cols-2 items-center">

        {/* Left CONTENT */}
        <div className="relative justify-center md:justify-end px-20">

          {/* Badge */}
          <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4">
            Our Services
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Stress Management
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Stress management focuses on helping you identify the sources of stress
            in your life and equipping you with practical techniques to handle them 
            effectively. Through guided sessions, you will learn relaxation strategies, 
            time management skills, and mindfulness practices that promote calmness and 
            clarity. Our goal is to help you reduce overwhelm, improve focus, and maintain a 
            healthier balance between your personal and professional life.
          </p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={stress} alt="" className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default StressManagement;