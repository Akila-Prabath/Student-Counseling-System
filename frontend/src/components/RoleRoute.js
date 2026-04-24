import { Navigate } from "react-router-dom";

function RoleRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 normalize role (VERY IMPORTANT)
  const userRole = user.role.toLowerCase();

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RoleRoute;