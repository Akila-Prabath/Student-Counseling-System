import { useState } from "react";
import Navbar from "../components/Navbar";
import AnonymousSupport from "../components/AnonymousSupport";
import APageHeader from "../components/APageHeader";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Anonymous() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <APageHeader />
            <AnonymousSupport />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Anonymous;