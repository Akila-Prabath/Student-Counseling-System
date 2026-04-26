import { useState } from "react";
import Navbar from "../components/Navbar";
import ShowAppointments from "../components/ShowAppointments";
import CounselorAppointments from "../components/CounselorAppointments";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import BPageHeader from "../components/BPageHeader";

function Appointments() {
  const [showLogin, setShowLogin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="pt-0">
      <Navbar onLoginClick={() => setShowLogin(true)} />
        <BPageHeader />
      {user?.role === "counselor" ? (
        <CounselorAppointments />
      ) : (
        <ShowAppointments />
      )}
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