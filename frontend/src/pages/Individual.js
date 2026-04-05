import { useState } from "react";
import Navbar from "../components/Navbar";
import IndividualTherapy from "../components/IndividualTherapy";
import IPageHeader from "../components/IPageHeader";

import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Individual() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <IPageHeader />
            <IndividualTherapy />          
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Individual;