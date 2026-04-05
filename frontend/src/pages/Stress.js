import { useState } from "react";
import Navbar from "../components/Navbar";
import StressManagement from "../components/StressManagement";
import SPageHeader from "../components/SPageHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Stress() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <SPageHeader />
            <StressManagement />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Stress;