import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner/>
  }

  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
