import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import Message from "./pages/Messages";
import AboutUs from "./pages/AboutUs";
import Individual from "./pages/Individual";
import Couples from "./pages/Couples";
import Stress from "./pages/Stress";
import Depression from "./pages/Depression";
import Resources from "./pages/Resources";
import Anonymous from "./pages/Anonymous";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AddResource from "./pages/Resource";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import BookAppointment from "./pages/BookAppointment";

import AdminDashboard from "./pages/admin/AdminDashboard";
//import Students from "./pages/admin/Students";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudents from "./pages/admin/ViewStudents";
import EditStudent from "./pages/admin/EditStudent";
import AddCounselor from "./pages/admin/AddCounselor";
import ViewCounselors from './pages/admin/ViewCounselors';
import EditCounselor from './pages/admin/EditCounselor';
import AdminAppointments from "./pages/admin/Appointments";
import AdminProfile from "./pages/admin/AdminProfile";
import Resource from "./pages/admin/Resources.js";
import Messages from "./pages/admin/Messages.js";
import Contacts from "./pages/admin/Contacts.js";



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
        
        <Route path="/admin/students/add" element={<AddStudent />} />
        <Route path="/admin/students" element={<ViewStudents />} />
        <Route path="/admin/students/edit/:id" element={<EditStudent />} />

        <Route path="/admin/counselors/add" element={<AddCounselor />} />
        <Route path="/admin/counselors" element={<ViewCounselors />} />
        <Route path="/admin/counselors/edit/:id" element={<EditCounselor />} />

        <Route path="/admin/appointments" element={<AdminAppointments />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/resources" element={<Resource />} />
        <Route path="/admin/messages" element={<Messages />} />
        <Route path="/admin/contacts" element={<Contacts />} />


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
          path="/Messages"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Resource"
          element={
            <ProtectedRoute>
              <AddResource />
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