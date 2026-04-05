import individual from "../assets/services/individual.jpg";

//import { FaStar } from "react-icons/fa";

function IndividualTherapy() {
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
            Individual therapy provides a safe, confidential space where 
            you can openly discuss your thoughts, emotions, and challenges 
            with a licensed professional. Through one-on-one sessions, our 
            therapists help you gain deeper self-awareness, identify patterns,
            and develop healthier coping strategies. Whether you are dealing with 
            anxiety, stress, trauma, or personal growth challenges, individual therapy empowers 
            you to take control of your mental well-being and build a more balanced life.
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

export default IndividualTherapy;