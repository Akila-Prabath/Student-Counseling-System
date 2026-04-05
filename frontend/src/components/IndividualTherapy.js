import individual from "../assets/services/individual.jpg";

//import { FaStar } from "react-icons/fa";

function WhoWeAre() {
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
            Individual Therapy
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Located in Kurunegala, Sri Lanka, Mindcare specializes in providing top psychotherapy services. 
            Our team of experienced professionals is dedicated to helping you achieve mental wellness and personal growth. 
            Trust Mindcare for all your psychotherapy needs.
          </p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={individual} alt="" className="w-full h-[260px] md:h-[320px] object-cover object-top rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default WhoWeAre;