import couples from "../assets/services/couples.jpg";
import { useNavigate } from "react-router-dom";

function CouplesCounseling() {
  const navigate = useNavigate();

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
            Couples Counseling
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Couples counseling is designed to help partners strengthen their 
            relationship by improving communication, resolving conflicts, and 
            rebuilding trust. Our experienced counselors guide couples through 
            meaningful conversations to better understand each other’s perspectives 
            and emotional needs. Whether you are facing ongoing disagreements, life 
            transitions, or emotional distance, this service helps you reconnect, grow together, 
            and build a healthier, more supportive relationship.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/book")}
            className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Book Appointment
          </button>

        </div>

         {/* Right IMAGES GRID */}
        <div className="flex justify-center md:justify-end">
          
          <img src={couples} alt="" className="w-full max-w-md h-[260px] md:h-[360px] object-cover rounded-2xl shadow-lg" />
        </div>

      </div>
    </div>
  );
}

export default CouplesCounseling;