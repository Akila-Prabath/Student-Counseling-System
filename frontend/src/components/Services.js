import individualImg from "../assets/services/individual.jpg";
import couplesImg from "../assets/services/couples.jpg";
import stressImg from "../assets/services/stress.jpg";
import depressionImg from "../assets/services/depression.jpg";
import resourcesImg from "../assets/services/resources.jpg";
import anonymousImg from "../assets/services/anonymous.jpg";

function Services() {

  const services = [
    {
      title: "Individual Therapy",
      desc: "One-on-one sessions with licensed professionals to help you understand your thoughts, manage emotions, and improve your mental well-being.",
      img: individualImg
    },
    {
      title: "Couples Counseling",
      desc: "Strengthen your relationship through guided conversations, conflict resolution strategies, and emotional support for both partners.",
      img: couplesImg
    },
    {
      title: "Stress Management",
      desc: "Learn practical techniques to reduce stress, improve focus, and maintain a balanced and healthy lifestyle.",
      img: stressImg
    },
    {
      title: "Depression Therapy",
      desc: "Receive compassionate support and evidence-based therapy to overcome depression and regain control of your life.",
      img: depressionImg
    },
    {
      title: "Mental Resources",
      desc: "Explore curated articles, videos, and self-help guides to support your mental health journey and personal growth.",
      img: resourcesImg
    },
    {
      title: "Anonymous Support",
      desc: "Share your concerns freely and get guidance without revealing your identity in a safe and confidential environment.",
      img: anonymousImg
    }
  ];

  return (
    <div id="services" className="py-20 px-10 bg-orange-100 text-center">

      <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm mb-4 text-center">Our Services</div>
      <h3 className="text-black text-4xl font-bold mb-10 text-center">Therapist & <span className="text-orange-600 italic font-semibold">Treatments</span></h3>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We offer a range of mental health services including therapy, counseling, and support systems to help you live a healthier and happier life.
      </p>
      <div className="grid md:grid-cols-3 gap-10 text-left">

        {services.map((service, index) => (

          <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group">

            {/* Image + Hover */}
            <div className="relative h-80 overflow-hidden group">

              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                <button className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transform scale-90 group-hover:scale-100 transition duration-300">
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