import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false); // close mobile menu
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-stone-950 shadow-md text-white" : "bg-stone-950 text-white"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20 py-4">
        
        {/* Logo */}
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          MindCare
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-semibold">
          <button onClick={() => (window.location.href = "/")} className="hover:text-orange-500">
            Home
          </button>

          <button onClick={() => scrollToSection("services")} className="hover:text-orange-500">
            Services
          </button>

          <button onClick={() => (window.location.href = "/AboutUs")} className="hover:text-orange-500">
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

        {/* Mobile Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-stone-950 text-white flex flex-col items-center gap-6 py-6 transition-all duration-300">

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
            className="bg-orange-950 px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;