import resources from "../assets/services/resources.jpg";
//import { useNavigate } from "react-router-dom";

function MentalResources() {
  
  return (
    <div className="py-20 px-6 md:px-16 bg-gray-100">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-200 text-orange-900 px-4 py-1 rounded-full text-sm mb-4 font-medium">
            Our Services
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Mental Resources
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Our mental resources section provides a collection of 
            valuable materials designed to support your mental health journey. 
            From informative articles and self-help guides to videos and expert advice, 
            these resources are carefully curated to help you better understand your 
            emotions and improve your well-being. Whether you are seeking quick tips or 
            in-depth knowledge, this section empowers you to take proactive steps toward 
            mental wellness.</p>

          
        </div>

         {/* Right IMAGES GRID */}
        <div className="flex justify-center md:justify-end">
          
          <img src={resources} alt="" className="w-full max-w-md h-[260px] md:h-[360px] object-cover rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default MentalResources;