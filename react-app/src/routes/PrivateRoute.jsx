import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

const RequireAuth = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();
  if (isLoading) return <p>Loading...</p>;
  if (!(user?.email || user?.displayName))
    return <Navigate to="/login" state={{ from: location }} />;
  return children;
};

export default RequireAuth;
