import aboutUs2 from "../assets/aboutUs/aboutUs2.jpg";
import { useNavigate } from "react-router-dom";

function WhoWeAre() {
  const navigate = useNavigate();

  return (
    <div className="py-20 px-6 md:px-16 bg-gray-100">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="relative flex justify-center md:justify-end">

          <img
            src={aboutUs2}
            alt="Mental health professionals"
            className="w-full max-w-md h-[260px] md:h-[380px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-200 text-orange-900 px-4 py-1 rounded-full text-sm mb-4 font-medium">
            Who We Are
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Introducing Our Expert <br />
            Psychology Professionals
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Located in Kurunegala, Sri Lanka, MindCare specializes in delivering
            high-quality psychotherapy services. Our team of experienced
            professionals is committed to supporting your mental well-being and
            personal growth. We provide a safe and compassionate environment
            where you can explore your thoughts, overcome challenges, and build
            a healthier, more fulfilling life.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/contact")}
            className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Get in Touch
          </button>

        </div>

      </div>
    </div>
  );
}

export default WhoWeAre;