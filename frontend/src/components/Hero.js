import heroBg from "../assets/health.jpg";

function Hero({ onLoginClick }) {
  return (
    <div
      id="home"
      className="relative h-screen text-white flex items-center px-20 bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroBg})`
      }}
    >
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>

      {/* Content */}
      <div className="max-w-xl relative z-10">
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-[Poppins] font-bold mb-6 leading-tight">
          Better Mind. <br /> Better Life.
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl font-[Inter] text-gray-200 mb-8">
          Talk to professionals, find support, and <br /> improve your mental wellness today.
        </p>

        {/* Button */}
        <button
          onClick={onLoginClick}
          className="bg-orange-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Get Started
        </button>

      </div>

    </div>
  );
}

export default Hero;