import Psychologist1Img from "../assets/about/Psychologist1.jpg";
import Psychologist2Img from "../assets/about/Psychologist2.jpg";
import Psychologist3Img from "../assets/about/Psychologist3.jpg";
import Psychologist4Img from "../assets/about/Psychologist4.jpg";

import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function About() {

  const team = [
    {
      name: "Jeffery Mussman",
      role: "Psychologist",
      img: Psychologist1Img
    },
    {
      name: "Sophia Jenkins",
      role: "Psychologist",
      img: Psychologist2Img
    },
    {
      name: "Melissa Taylor",
      role: "Psychologist",
      img: Psychologist3Img
    },
    {
      name: "Noah Anderson",
      role: "Psychologist",
      img: Psychologist4Img
    }
  ];

  return (
    <div id="about" className="py-20 px-10 bg-white text-center">

      {/* Top Badge */}
      <div className="inline-block bg-orange-300 text-green-800 px-4 py-1 rounded-full text-sm mb-4">
        Behind the Scene
      </div>

      {/* Title */}
      <h2 className="text-4xl font-bold mb-4">
        Our <span className="text-orange-600 italic font-semibold">Team</span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Meet our experienced and compassionate professionals dedicated to supporting your mental well-being.
      </p>

      {/* Grid */}
      <div className="grid md:grid-cols-4 gap-10">

        {team.map((member, index) => (

          <div
            key={index}
            className="relative group"
          >

            {/* Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-80 object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* Bottom Overlay Card */}
            <div className="bg-orange-200 rounded-xl px-6 py-5 shadow-lg -mt-16 relative z-10 mx-4">

              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-700 text-sm mb-3">{member.role}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-3">

                <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <FaFacebookF />
                </div>

                <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <FaTwitter />
                </div>

                <div className="bg-white p-2 rounded-md cursor-pointer hover:bg-gray-100">
                  <FaInstagram />
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default About;