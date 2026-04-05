import anonymous from "../assets/services/anonymous.jpg";

//import { FaStar } from "react-icons/fa";

function AnonymousSupport() {
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
            Anonymous Support
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Anonymous support allows you to share your concerns and 
            seek guidance without revealing your identity. This service is 
            ideal for individuals who may feel hesitant or uncomfortable discussing 
            sensitive issues openly. By providing a safe and confidential environment, 
            we ensure that you can express yourself freely and receive professional advice 
            without fear of judgment, helping you take the first step toward healing.</p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={anonymous} alt="" className="w-full h-[260px] md:h-[320px] object-cover object-top rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default AnonymousSupport;