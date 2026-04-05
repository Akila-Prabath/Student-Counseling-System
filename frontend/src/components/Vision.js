function Vision() {
  return (
    <div className="py-20 px-6 md:px-16 bg-white text-center">

      {/* Section Header */}
      <div className="inline-block bg-orange-200 text-orange-900 px-4 py-1 rounded-full text-sm">
        Vision & Mission
      </div>

      <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-12">
        Our Vision & Mission
      </h2>

      <div className="grid md:grid-cols-2 gap-10 text-left">

        {/* 🔹 VISION */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">

          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🌿 Our Vision
          </h3>

          <p className="text-gray-600 leading-relaxed">
            To create a supportive and stigma-free world where mental health is
            valued as an essential part of overall well-being, and where every
            individual has access to high-quality, compassionate care. We
            envision a future where seeking help is encouraged, conversations
            around mental health are open and accepted, and no one feels alone
            in their struggles. By empowering individuals with the right tools,
            guidance, and professional support, we strive to help people lead
            balanced, resilient, and fulfilling lives.
          </p>

        </div>

        {/* 🔹 MISSION */}
        <div className="bg-gray-50 p-8 rounded-xl shadow-sm">

          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            🎯 Our Mission
          </h3>

          <div className="space-y-5">

            <div>
              <h4 className="text-lg font-semibold text-orange-600">
                Accessible Mental Health Support
              </h4>
              <p className="text-gray-600 text-sm">
                We aim to make professional mental health services easily accessible to everyone through digital platforms, ensuring help is available anytime and anywhere.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-orange-600">
                Personalized Care & Guidance
              </h4>
              <p className="text-gray-600 text-sm">
                We provide tailored therapy and counseling solutions that address each individual’s unique emotional and psychological needs.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-orange-600">
                Promote Awareness & Well-being
              </h4>
              <p className="text-gray-600 text-sm">
                We strive to reduce stigma, raise awareness, and encourage people to prioritize their mental health through education and support.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Vision;