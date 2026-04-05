import resources from "../assets/services/resources.jpg";

//import { FaStar } from "react-icons/fa";

function MentalResources() {
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
            Mental Resources
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Our mental resources section provides a collection of 
            valuable materials designed to support your mental health journey. 
            From informative articles and self-help guides to videos and expert advice, 
            these resources are carefully curated to help you better understand your 
            emotions and improve your well-being. Whether you are seeking quick tips or 
            in-depth knowledge, this section empowers you to take proactive steps toward 
            mental wellness.</p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={resources} alt="" className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default MentalResources;