import { useState } from "react";
import Navbar from "../components/Navbar";
import CoPageHeader from "../components/CoPageHeader";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <CoPageHeader />
            <ContactUs />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Home;