import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Services from "../components/Services";
import Stats from "../components/Stats";
import About from "../components/About";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="pt-0">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Hero onLoginClick={() => setShowLogin(true)} />
      <Welcome />
      <Services />
      <Stats />
      <About />
      <FAQ />
      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
}

export default Home;