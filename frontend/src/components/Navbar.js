import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false); // services
      setProfileOpen(false);  // profile
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
              <div className="absolute top-10 left-0 mt-2 bg-orange-950 text-white rounded-lg shadow-lg w-56 py-2 z-50">

                <button
                  onClick={() => {
                    navigate("/individual-therapy");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Individual Therapy
                </button>

                <button
                  onClick={() => {
                    navigate("/couples-counseling");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Couples Counseling
                </button>

                <button
                  onClick={() => {
                    navigate("/stress-management");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Stress Management
                </button>

                <button
                  onClick={() => {
                    navigate("/depression-therapy");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Depression Therapy
                </button>

                <button
                  onClick={() => {
                    navigate("/resources");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Mental Resources
                </button>

                <button
                  onClick={() => {
                    navigate("/anonymous-support");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-orange-700"
                >
                  Anonymous Support
                </button>

              </div>
            )}
          </div>

          <button onClick={() => navigate("/AboutUs")} className="hover:text-orange-500">
            About Us
          </button>

          <button onClick={() => navigate("/Contact")} className="hover:text-orange-500">
            Contact
          </button>

          {!user ? (
            <button
              onClick={onLoginClick}
              className="bg-orange-950 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-4">

              {/* LOGIN BUTTON (always separate) */}
              {!user ? (
                <button
                  onClick={onLoginClick}
                  className="bg-orange-950 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Login
                </button>
              ) : (
                <div className="flex items-center gap-4">

                  <div className="relative">

                    <img
                      src={
                        user?.profilePic
                          ? `http://localhost:8070/uploads/${user.profilePic}`
                          : "https://i.pravatar.cc/40"
                      }
                      onError={(e) => {
                        e.target.src = "https://i.pravatar.cc/40";
                      }}
                      alt="profile"
                      loading="lazy"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileOpen(!profileOpen);
                      }}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-white hover:scale-105 transition"
                    />

                    {profileOpen && (
                      <div className="absolute right-0 mt-3 bg-orange-950 text-white rounded-xl shadow-lg w-56 py-3 z-50">

                        {/* 🔥 Welcome text */}
                        <p className="px-5 pb-2 text-sm text-gray-300">
                          Welcome back,{" "}
                          <span className="text-orange-400 font-semibold">
                            {user.name}
                          </span>
                        </p>

                        <hr className="border-gray-700 mb-2" />

                        <button
                          onClick={() => {
                            navigate("/profile");
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2 hover:bg-orange-600"
                        >
                          Your Profile
                        </button>

                        <button
                          onClick={() => {
                            navigate("/Appointment");
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2 hover:bg-orange-600"
                        >
                          Appointments
                        </button>

                        <button
                          onClick={() => {
                            navigate("/Messages");
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2 hover:bg-orange-600"
                        >
                          Messages
                        </button>
                        
                        <button
                          onClick={() => {
                            navigate("/resource");
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2 hover:bg-orange-600"
                        >
                          Resources
                        </button>

                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileOpen(false);
                          }}
                          className="block w-full text-left px-5 py-2 hover:bg-orange-600 text-red-300"
                        >
                          Logout
                        </button>

                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

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

          {/* Services */}
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

          {/* 🔥 AUTH SECTION */}
          {!user ? (
            <button
              onClick={onLoginClick}
              className="bg-orange-950 px-6 py-2 rounded-lg hover:bg-orange-600 transition mt-2"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-3">

              {/* Avatar */}
              <img
                src={
                  user?.profilePic
                    ? `http://localhost:8070/uploads/${user.profilePic}`
                    : "https://i.pravatar.cc/60"
                }
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/60";
                }}
                alt="profile"
                loading="lazy"
                className="w-14 h-14 rounded-full border-2 border-white object-cover"
              />

              {/* Menu Items */}
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-orange-400"
              >
                Your Profile
              </button>

              <button
                onClick={() => navigate("/appointments")}
                className="hover:text-orange-400"
              >
                Appointments
              </button>
              
              <button
                onClick={() => navigate("/messages")}
                className="hover:text-orange-400"
              >
                Messages
              </button>

              <button
                onClick={() => navigate("/resource")}
                className="hover:text-orange-400"
              >
                Resources
              </button>

              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;