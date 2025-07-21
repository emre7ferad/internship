import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, token } = useAuth();

  // If the token is still loading or the user is not authenticated, redirect to login
  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute; 