import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

export default ProtectedRoute;