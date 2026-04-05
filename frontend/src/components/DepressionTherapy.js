import depression from "../assets/services/depression.jpg";

//import { FaStar } from "react-icons/fa";

function DepressionTherapy() {
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
            Depression Therapy
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Depression therapy offers compassionate and professional 
            support to individuals experiencing persistent sadness, lack 
            of motivation, or emotional exhaustion. Our therapists use 
            evidence-based approaches to help you understand the root causes 
            of your feelings and develop effective coping strategies. With consistent 
            guidance and support, you can regain hope, rebuild confidence, and move 
            toward a more positive and fulfilling life</p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={depression} alt="" className="w-full h-[260px] md:h-[320px] object-cover object-top rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default DepressionTherapy;