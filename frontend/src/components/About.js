function About() {
  return (
    <div id="about" className="py-20 px-10 flex flex-col md:flex-row items-center gap-10">
      
      <img
        src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
        alt="about"
        className="w-80"
      />

      <div>
        <h2 className="text-3xl font-bold mb-4">About Us</h2>

        <p className="text-gray-600">
          We provide a safe and supportive platform for students to connect
          with professional counselors and improve their mental well-being.
        </p>
      </div>
    </div>
  );
}

export default About;