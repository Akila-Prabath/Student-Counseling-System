import { useState } from "react";
import Navbar from "../components/Navbar";
import StudentResources from "../components/StudentResources";
import CounselorResources from "../components/CounselorResources";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import RPageHeader from "../components/RPageHeader";

function Resource() {
  const [showLogin, setShowLogin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="pt-0">
      <Navbar onLoginClick={() => setShowLogin(true)} />
        <RPageHeader />
      {user?.role === "counselor" ? (
        <CounselorResources />
      ) : (
        <StudentResources />
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

export default Resource;