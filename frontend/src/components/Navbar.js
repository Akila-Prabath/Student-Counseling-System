import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "bg-stone-950 shadow-md text-white" : "bg-stone-950 text-white"
        }`}
    >
      <div className="flex justify-between items-center px-6 md:px-20 py-4">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          MindCare
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-semibold">

          <button onClick={() => navigate("/")} className="hover:text-orange-500">
            Home
          </button>

          {/* SERVICES DROPDOWN */}
          <div className="relative">

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(!dropdownOpen);
              }}
              className="inline-flex items-center gap-2 hover:text-orange-500"
            >
              Services
              <FaChevronDown
                className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-10 left-0 bg-orange-950 text-white rounded-lg shadow-lg w-56 py-2 z-50">

                <button
                  onClick={() => {
                    navigate("/individual-therapy");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Individual Therapy
                </button>

                <button
                  onClick={() => {
                    navigate("/couples-counseling");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Couples Counseling
                </button>

                <button
                  onClick={() => {
                    navigate("/stress-management");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Stress Management
                </button>

                <button
                  onClick={() => {
                    navigate("/depression-therapy");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Depression Therapy
                </button>

                <button
                  onClick={() => {
                    navigate("/resources");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Mental Resources
                </button>

                <button
                  onClick={() => {
                    navigate("/anonymous-support");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                >
                  Anonymous Support
                </button>

              </div>
            )}
          </div>

          <button onClick={() => navigate("/AboutUs")} className="hover:text-orange-500">
            About Us
          </button>

          <button onClick={() => navigate("/#contact")} className="hover:text-orange-500">
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
        <div className="md:hidden bg-stone-950 text-white flex flex-col items-center gap-4 py-6">

          <button onClick={() => navigate("/")} className="hover:text-orange-500">
            Home
          </button>

          {/* Mobile Services */}
          <div className="flex flex-col items-center gap-2">

            <p className="font-semibold">Services</p>

            <button onClick={() => navigate("/individual-therapy")} className="text-sm hover:text-orange-400">
              Individual Therapy
            </button>

            <button onClick={() => navigate("/couples-counseling")} className="text-sm hover:text-orange-400">
              Couples Counseling
            </button>

            <button onClick={() => navigate("/stress-management")} className="text-sm hover:text-orange-400">
              Stress Management
            </button>

            <button onClick={() => navigate("/depression-therapy")} className="text-sm hover:text-orange-400">
              Depression Therapy
            </button>

            <button onClick={() => navigate("/resources")} className="text-sm hover:text-orange-400">
              Mental Resources
            </button>

            <button onClick={() => navigate("/anonymous-support")} className="text-sm hover:text-orange-400">
              Anonymous Support
            </button>

          </div>

          <button onClick={() => navigate("/AboutUs")} className="hover:text-orange-500">
            About Us
          </button>

          <button onClick={() => navigate("/Contact")} className="hover:text-orange-500">
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