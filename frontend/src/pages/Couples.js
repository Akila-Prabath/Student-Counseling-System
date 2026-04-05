import { useState } from "react";
import Navbar from "../components/Navbar";
import CouplesCounseling from "../components/CouplesCounseling";
import CPageHeader from "../components/CPageHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Couples() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <CPageHeader />
            <CouplesCounseling />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Couples;