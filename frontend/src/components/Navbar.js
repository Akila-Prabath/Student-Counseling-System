import { useState, useEffect } from "react";

function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-stone-950 shadow-md text-white" : "bg-transparent text-white"
      }`}
    >
      <div className="flex justify-between items-center px-20 py-4">
        
        {/* Logo */}
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          MindCare
        </h1>

        {/* Menu (RIGHT SIDE) */}
        <div className="flex text-2x1 font-bold items-center gap-10">
          
          <button onClick={() => scrollToSection("home")} className="hover:text-orange-500">
            Home
          </button>

          <button onClick={() => scrollToSection("services")} className="hover:text-orange-500">
            Services
          </button>

          <button onClick={() => scrollToSection("about")} className="hover:text-orange-500">
            About Us
          </button>

          <button onClick={() => scrollToSection("contact")} className="hover:text-orange-500">
            Contact
          </button>

          <button
            onClick={onLoginClick}
            className="bg-orange-950 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;