import individual from "../assets/services/individual.jpg";
import { useNavigate } from "react-router-dom";

function IndividualTherapy() {
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
            Individual Therapy
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
            Individual therapy provides a safe, confidential space where you can openly 
            explore your thoughts, emotions, and challenges with a licensed professional. 
            Through one-on-one sessions, our therapists help you gain deeper self-awareness, 
            identify patterns, and develop healthier coping strategies. Whether you are 
            dealing with anxiety, stress, trauma, or personal growth challenges, individual 
            therapy empowers you to take control of your mental well-being and build a more 
            balanced and fulfilling life.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/book")}
            className="bg-orange-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-md"
          >
            Book Appointment
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">

          <img
            src={individual}
            alt="Individual Therapy Session"
            className="w-full max-w-md h-[260px] md:h-[360px] object-cover rounded-2xl shadow-lg"
          />

        </div>

      </div>
    </div>
  );
}

export default IndividualTherapy;