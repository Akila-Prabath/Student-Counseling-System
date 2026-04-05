import couples from "../assets/services/couples.jpg";

//import { FaStar } from "react-icons/fa";

function CouplesCounseling() {
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
            Couples Counseling
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            Couples counseling is designed to help partners strengthen their 
            relationship by improving communication, resolving conflicts, and 
            rebuilding trust. Our experienced counselors guide couples through 
            meaningful conversations to better understand each other’s perspectives 
            and emotional needs. Whether you are facing ongoing disagreements, life 
            transitions, or emotional distance, this service helps you reconnect, grow together, 
            and build a healthier, more supportive relationship.
          </p>
        </div>

         {/* Right IMAGES GRID */}
        <div className="relative flex justify-center md:justify-end px-20">
          
          <img src={couples} alt="" className="w-full h-[260px] md:h-[320px] object-cover object-top rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default CouplesCounseling;