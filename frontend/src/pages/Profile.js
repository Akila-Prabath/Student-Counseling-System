import { useState } from "react";
import Navbar from "../components/Navbar";
//import BPageHeader from "../components/BPageHeader";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Profile() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Profile;