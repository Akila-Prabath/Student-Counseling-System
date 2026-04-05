import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import Individual from "./pages/Individual";

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
        <Route path="/couples-counseling" element={<h1>Couples Counseling Page</h1>} />
        <Route path="/stress-management" element={<h1>Stress Management Page</h1>} />
        <Route path="/depression-therapy" element={<h1>Depression Therapy Page</h1>} />
        <Route path="/resources" element={<h1>Resources Page</h1>} />
        <Route path="/anonymous-support" element={<h1>Anonymous Support Page</h1>} />

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