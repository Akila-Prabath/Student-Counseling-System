function Vision() {
    return (
        <div className="py-20 px-6 md:px-20 bg-white text-center">

            <div className="inline-block bg-orange-300 text-orange-950 px-4 py-1 rounded-full text-sm">
                Vision & Mission
            </div>

            <h2 className="text-3xl font-bold mt-4 leading-tight">
                Vision & Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-0">

                {/* LEFT IMAGES GRID */}
                <div className="text-left px-20">
                    <h2 className="text-2xl text-gray-700 mt-6 font-bold leading-tight">
                        Our Vision
                    </h2>
                    <p className="text-xl text-gray-500 mt-4 font-bold max-w-xl">
                        To create a supportive and stigma-free world where mental health is valued as 
                        an essential part of overall well-being, and where every individual has access to 
                        high-quality, compassionate care. We envision a future where seeking help is encouraged, 
                        conversations around mental health are open and accepted, and no one feels alone in their struggles. 
                        By empowering individuals with the right tools, guidance, and professional support, 
                        we strive to help people lead balanced, resilient, and fulfilling lives.
                    </p>
                </div>

                {/* RIGHT CONTENT */}
                <div className="text-left">
                    <h2 className="text-2xl text-gray-700 font-bold mt-6 leading-tight">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-xl text-left ">
                        <span className="text-xl text-orange-900 font-bold">
                            Accessible Mental Health Support: 
                        </span> <br />
                        We aim to make professional mental health services easily accessible to
                        everyone through user-friendly digital platforms, ensuring help is available anytime and anywhere.
                    </p>

                    <p className="text-gray-600 mt-4 max-w-xl text-left">
                        <span className="text-xl text-orange-900 font-bold">
                            Personalized Care & Guidance: 
                        </span> <br />
                        We are committed to providing tailored therapy and counseling solutions that address each individual’s unique emotional and psychological needs.
                    </p>

                    <p className="text-gray-600 mt-4 max-w-xl text-left">
                        <span className="text-xl text-orange-900 font-bold">
                            Promote Awareness & Well-being: 
                        </span> <br />
                        We strive to raise awareness about mental health, reduce stigma, and encourage people to prioritize their emotional well-being through education and support.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Vision;