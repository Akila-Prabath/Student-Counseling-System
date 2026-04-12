import heroBg from "../assets/health.jpg";
import { useNavigate } from "react-router-dom";

function Hero({ onLoginClick }) {
  const navigate = useNavigate();
  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center px-6 md:px-20 py-20 text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`
      }}
    >
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

      {/* Content */}
      <div className="max-w-xl relative z-10 text-center md:text-left">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-[Poppins] font-bold mb-6 leading-tight">
          Better Mind. Better Life.
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl font-[Inter] text-gray-200 mb-8">
          Talk to professionals, find support, and improve your mental wellness today.
        </p>

        <div className="flex inline-block gap-10">
        {/* Button */}
        <button
          onClick={onLoginClick}
          className="bg-orange-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Get Started
        </button>
        {/* CTA Button */}
        <button
            onClick={() => navigate("/book")}
            className="bg-orange-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Book Appointment
        </button>
        </ div>
      </div>

    </div>
  );
}

export default Hero;