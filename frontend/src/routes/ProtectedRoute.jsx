import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedPermissions }) {
  const { isAuthenticated, authInitialized, user } = useSelector(
    (state) => state.auth,
  );

  if (!authInitialized) {
    return <h2>Initializing...</h2>;
  }
  const userPermissions = user?.permissions;
  const permissionGranted = allowedPermissions && userPermissions 
    ? allowedPermissions?.every((perm) => userPermissions.includes(perm))
    : true;

  console.log(
    "userPermissions",
    userPermissions,
    "permissionGranted",
    allowedPermissions,
  );

  if (!permissionGranted) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
