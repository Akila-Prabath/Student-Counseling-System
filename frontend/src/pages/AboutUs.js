import { useState } from "react";
import Navbar from "../components/Navbar";
import WhoWeAre from "../components/WhoWeAre";
import PageHeader from "../components/PageHeader";
import Stats from "../components/Stats";
import About from "../components/About";
import Vision from "../components/Vision";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <PageHeader />
            <WhoWeAre />
            <Stats />            
            <About />
            <Vision />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Home;