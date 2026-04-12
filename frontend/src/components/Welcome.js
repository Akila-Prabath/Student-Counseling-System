import img1 from "../assets/welcome/welcome1.jpg";
import img2 from "../assets/welcome/welcome2.jpg";
import img3 from "../assets/welcome/welcome3.jpg";
import img4 from "../assets/welcome/welcome4.jpg";
import { useNavigate } from "react-router-dom";

import { FaCheckCircle, FaStar } from "react-icons/fa";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="py-20 px-6 md:px-10 bg-gray-100">

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT IMAGES GRID */}
        <div className="grid grid-cols-2 gap-5">
          
          <img src={img1} alt="" className="rounded-xl w-full h-52 md:h-64 object-cover" />
          <img src={img2} alt="" className="rounded-xl w-full h-52 md:h-64 object-cover" />
          <img src={img3} alt="" className="rounded-xl w-full h-52 md:h-64 object-cover col-span-1" />
          <img src={img4} alt="" className="rounded-xl w-full h-52 md:h-64 object-cover" />

        </div>

        {/* RIGHT CONTENT */}
        <div>

          {/* Badge */}
          <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4">
            Welcome
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Transform Your <br />
            <span className="text-orange-600 italic font-semibold">
              Mental Health
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 max-w-xl">
            We provide professional psychotherapy services to help you achieve
            mental wellness and personal growth. Our experienced counselors are
            here to support you every step of the way.
          </p>

          {/* Features */}
          <div className="space-y-2 mb-6">

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <p>Confidential and safe environment</p>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <p>Experienced professional counselors</p>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <p>Flexible online appointments</p>
            </div>

            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <p>Personalized mental health plans</p>
            </div>

          </div>

          {/* Rating + Button */}
          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>
              <p className="font-semibold">Excellent</p>

              <div className="flex text-yellow-400">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>

              <p className="text-sm text-gray-500">
                Based on 85 reviews
              </p>
            </div>

            <button 
            onClick={() => navigate("/AboutUs")}
            className="bg-orange-800 text-white px-6 py-3 rounded-lg self-start hover:bg-orange-600 transition">
              About Us
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Welcome;