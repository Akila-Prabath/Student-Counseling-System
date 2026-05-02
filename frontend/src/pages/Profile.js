import { useState } from "react";
import Navbar from "../components/Navbar";
import PPageHeader from "../components/PPageHeader";
import StudentProfile from "../components/StudentProfile";
import CounselorProfile from "../components/CounselorProfile";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import FAQ from "../components/FAQ";

function Profile() {
  const [showLogin, setShowLogin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")); // ✅ FIX

  return (
    <div className="pt-0">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <PPageHeader />

      {user?.role === "counselor" ? (
        <CounselorProfile />
      ) : (
        <StudentProfile />
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

export default Profile;