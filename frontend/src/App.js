import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import Individual from "./pages/Individual";
import Couples from "./pages/Couples";
import Stress from "./pages/Stress";
import Depression from "./pages/Depression";
import Resources from "./pages/Resources";
import Anonymous from "./pages/Anonymous";

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

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
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

      </Routes>
    </Router>
  );
}

export default App;