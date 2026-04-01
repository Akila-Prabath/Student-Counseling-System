function Hero({ onLoginClick }) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white py-24 px-10 flex flex-col md:flex-row items-center justify-between">
      
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Your Mental Health <br /> Matters
        </h1>

        <p className="mb-6 text-lg">
          Connect with professional counselors and get support anytime.
        </p>

        <button
          onClick={onLoginClick}
          className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
        alt="therapy"
        className="w-96 mt-10 md:mt-0"
      />
    </div>
  );
}

export default Hero;