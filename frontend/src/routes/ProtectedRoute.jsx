import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, authInitialized, user } = useSelector(
    (state) => state.auth,
  );

  if (!authInitialized) {
    return <h2>Initializing...</h2>;
  }

  const userRole = user?.role;
  if (allowedRoles && allowedRoles.length && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
