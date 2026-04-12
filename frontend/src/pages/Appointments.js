import { useState } from "react";
import Navbar from "../components/Navbar";
//import BPageHeader from "../components/BPageHeader";
import ShowAppointments from "../components/ShowAppointments";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

function Appointments() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="pt-0">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <ShowAppointments />  
            <FAQ />
            <Footer />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
            />
        </div>
    );
}

export default Appointments;