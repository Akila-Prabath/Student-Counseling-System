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
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20"></div>

      {/* Content */}
      <div className="max-w-xl relative z-10 text-center md:text-left md:ml-20">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-[Poppins] font-bold mb-10 leading-tight">
          Better Mind. Better Life.
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl font-[Poppins] text-gray-200 mb-10 leading-relaxed">
          Talk to professionals, find support, and improve<br /> your mental wellness today.
        </p>

        <div className="flex items-center gap-5">

          {/* Primary CTA */}
          <button
            onClick={() => navigate("/book")}
            className="bg-orange-700 text-white text-sm px-6 py-3 rounded font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:scale-105"
          >
            Book Appointment
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onLoginClick}
            className="border-2 border-white text-white text-sm px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition duration-300"
          >
            Get Started 
          </button>

        </div>
      </div>

    </div>
  );
}

export default Hero;