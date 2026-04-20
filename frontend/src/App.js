import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import AboutUs from "./pages/AboutUs";
import Individual from "./pages/Individual";
import Couples from "./pages/Couples";
import Stress from "./pages/Stress";
import Depression from "./pages/Depression";
import Resources from "./pages/Resources";
import Anonymous from "./pages/Anonymous";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import Counselors from "./pages/admin/Counselors";
import AdminAppointments from "./pages/admin/Appointments";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import BookAppointment from "./pages/BookAppointment";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/individual-therapy" element={<Individual />} />
        <Route path="/couples-counseling" element={<Couples />} />
        <Route path="/stress-management" element={<Stress />} />
        <Route path="/depression-therapy" element={<Depression />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/anonymous-support" element={< Anonymous />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/students/add" element={<Students />} />

        <Route path="/admin/counselors" element={<Counselors />} />
        <Route path="/admin/counselors/add" element={<Counselors />} />

        
        {/* Protected */}
        <Route
          path="/Appointment"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["student"]}>
                <BookAppointment />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

          <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;