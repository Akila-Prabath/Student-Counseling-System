import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What kind of therapy services do you offer?",
      answer: "We offer individual therapy, couples counseling, stress management, and specialized mental health support tailored to your needs."
    },
    {
      question: "Do you offer online therapy options?",
      answer: "Yes, we provide secure online sessions so you can connect with therapists from anywhere."
    },
    {
      question: "How can I schedule an appointment?",
      answer: "You can easily book an appointment through your dashboard after logging in."
    },
    {
      question: "Are your services covered by insurance?",
      answer: "Some services may be covered depending on your provider. Please contact us for more details."
    },
    {
      question: "Do you offer specialized therapy for specific issues?",
      answer: "Yes, we provide support for anxiety, depression, stress, and other mental health conditions."
    },
    {
      question: "Can I choose my therapist?",
      answer: "Yes, you can select your preferred counselor based on availability."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-6 md:px-20 bg-gray-50 ">

      {/* Title */}
      <div className="text-center mb-12">
        <span className="bg-orange-200 text-orange-950 px-4 py-1 rounded-full text-sm">
          Do you have
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Any <span className="text-orange-600 italic">Questions</span>
        </h2>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-5xl mx-auto space-y-4 ">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b pb-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >

            {/* Question */}
            <div className="flex justify-between items-center hover:text-orange-600 transition">
              <h3 className="font-medium text-sm ">
                {faq.question}
              </h3>

              <FaChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Answer */}
            {activeIndex === index && (
              <p className="text-gray-600 mt-3 text-sm ">
                {faq.answer}
              </p>
            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default FAQ;