import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authInitialized} = useSelector((state) => state.auth);

   if(!authInitialized) {
    return <h2>Initializing...</h2>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

 

  return children;
}

export default ProtectedRoute;
