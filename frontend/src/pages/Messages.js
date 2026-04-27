import { useState } from "react";
import Navbar from "../components/Navbar";
import StudentMessage from "../components/StudentMessage";
import CounselorMessage from "../components/CounselorMessage";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import MePageHeader from "../components/MePageHeader";

function Messages() {
  const [showLogin, setShowLogin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="pt-0">
      <Navbar onLoginClick={() => setShowLogin(true)} />
        <MePageHeader />
      {user?.role === "counselor" ? (
        <CounselorMessage />
      ) : (
        <StudentMessage />
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

export default Messages;