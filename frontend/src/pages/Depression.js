import { useState } from "react";
import Navbar from "../components/Navbar";
import DepressionTherapy from "../components/DepressionTherapy";
import DPageHeader from "../components/DPageHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Depression() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <DPageHeader />
            <DepressionTherapy />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Depression;