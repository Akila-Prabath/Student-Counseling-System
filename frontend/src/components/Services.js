import { useNavigate } from "react-router-dom";
import individualImg from "../assets/services/individual.jpg";
import couplesImg from "../assets/services/couples.jpg";
import stressImg from "../assets/services/stress.jpg";
import depressionImg from "../assets/services/depression.jpg";
import resourcesImg from "../assets/services/resources.jpg";
import anonymousImg from "../assets/services/anonymous.jpg";

function Services() {

  const navigate = useNavigate();

  const services = [
    {
      title: "Individual Therapy",
      desc: "One-on-one sessions with licensed professionals to help you understand your thoughts and improve mental well-being.",
      img: individualImg,
      path: "/individual-therapy"
    },
    {
      title: "Couples Counseling",
      desc: "Strengthen your relationship through guided conversations and emotional support.",
      img: couplesImg,
      path: "/couples-counseling"
    },
    {
      title: "Stress Management",
      desc: "Learn practical techniques to reduce stress and improve focus.",
      img: stressImg,
      path: "/stress-management"
    },
    {
      title: "Depression Therapy",
      desc: "Receive compassionate support to overcome depression.",
      img: depressionImg,
      path: "/depression-therapy"
    },
    {
      title: "Mental Resources",
      desc: "Explore articles, videos, and guides for mental health.",
      img: resourcesImg,
      path: "/resources"
    },
    {
      title: "Anonymous Support",
      desc: "Share concerns freely in a safe and confidential environment.",
      img: anonymousImg,
      path: "/anonymous-support"
    }
  ];

  return (
    <div id="services" className="py-20 px-10 bg-white text-center">

      <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4">
        Our Services
      </div>

      <h3 className="text-black text-4xl font-bold mb-10">
        Therapist & <span className="text-orange-600 italic font-semibold">Treatments</span>
      </h3>

      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We offer a range of mental health services including therapy, counseling, and support systems.
      </p>

      <div className="grid md:grid-cols-3 gap-10 text-left">

        {services.map((service, index) => (

          <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group">

            {/* Image */}
            <div className="relative h-80 overflow-hidden">

              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />

              {/* Hover Button */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                <button
                  onClick={() => navigate(service.path)}
                  className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transform scale-90 group-hover:scale-100 transition duration-300"
                >
                  Get Started
                </button>

              </div>

            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Services;