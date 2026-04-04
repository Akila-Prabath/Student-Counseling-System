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

function Home() {
  const [showLogin, setShowLogin] = useState(false);

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

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </div>
  );
}

export default Home;