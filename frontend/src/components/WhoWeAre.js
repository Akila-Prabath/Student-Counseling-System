import aboutUs2 from "../assets/aboutUs/aboutUs2.jpg";

//import { FaStar } from "react-icons/fa";

function WhoWeAre() {
  return (
    <div className="py-20 px-6 md:px-20 bg-gray-100">

      <div className="grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end">
          
          <img src={aboutUs2} alt="" className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl shadow-lg" />
        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4">
            Who We Are
          </div>

          {/* Title */}
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            Introducing Our Expert <br /> Psychology Professionals
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Located in Kurunegala, Sri Lanka, Mindcare specializes in providing top psychotherapy services. 
            Our team of experienced professionals is dedicated to helping you achieve mental wellness and personal growth. 
            Trust Mindcare for all your psychotherapy needs.
          </p>

          {/* Button */}
          <div className="flex items-center justify-between flex-wrap gap-4">

            <button className="bg-orange-800 text-white px-6 py-3 rounded-lg self-start hover:bg-orange-600 transition">
              Get in Touch
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default WhoWeAre;