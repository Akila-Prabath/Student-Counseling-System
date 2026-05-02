import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

function About() {

  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    try {
      const res = await API.get("/users/counselors");
      setCounselors(res.data);
    } catch (error) {
      console.error("Error fetching counselors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show only 4 counselors at a time
  const visibleCounselors = counselors.slice(startIndex, startIndex + 4);

  const nextSlide = () => {
    if (startIndex + 4 < counselors.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div id="about" className="py-20 px-10 bg-white text-center relative">

      {/* Top Badge */}
      <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4">
        Behind the Scene
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold mb-4">
        Our <span className="text-orange-600 italic font-semibold">Specialist</span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Meet our experienced and compassionate professionals dedicated to supporting your mental well-being.
      </p>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Loading counselors...</p>
      ) : counselors.length === 0 ? (
        <p className="text-gray-500">No counselors found.</p>
      ) : (
        <div className="relative">

          {/* Left Arrow */}
          {startIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg hover:bg-orange-500 hover:text-white transition p-4 rounded-full"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Right Arrow */}
          {startIndex + 4 < counselors.length && (
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg hover:bg-orange-500 hover:text-white transition p-4 rounded-full"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-4 gap-10 transition-all duration-500">

            {visibleCounselors.map((member) => (

              <div
                key={member._id}
                className="relative group"
              >

                {/* Image */}
                <div className="overflow-hidden rounded-xl">

                  <img
                    src={
                      member.profilePic
                        ? `http://localhost:8070/uploads/${member.profilePic}`
                        : "https://placehold.co/400x500?text=Counselor"
                    }
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/400x500?text=Counselor";
                    }}
                  />

                </div>

                {/* Bottom Overlay Card */}
                <div className="bg-orange-100 rounded-xl px-6 py-5 shadow-lg -mt-16 relative z-10 mx-4">

                  <h3 className="text-lg font-semibold">
                    {member.name}
                  </h3>

                  <p className="text-gray-700 text-sm mb-1">
                    {member.specialization || "Psychologist"}
                  </p>

                  <p className="text-gray-500 text-xs mb-3">
                    {member.experience
                      ? `${member.experience} experience`
                      : "Professional Counselor"}
                  </p>

                  {/* Social Icons */}
                  <div className="flex justify-center gap-3">

                    <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-orange-300 transition">
                      <FaFacebookF />
                    </div>

                    <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-orange-300 transition">
                      <FaTwitter />
                    </div>

                    <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-orange-300 transition">
                      <FaInstagram />
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default About;