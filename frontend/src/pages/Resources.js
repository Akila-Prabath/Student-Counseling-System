import { useState } from "react";
import Navbar from "../components/Navbar";
import MentalResources from "../components/MentalResources";
import MPageHeader from "../components/MPageHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Resources() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <MPageHeader />
            <MentalResources />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Resources;