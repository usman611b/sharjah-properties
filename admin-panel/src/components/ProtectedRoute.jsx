import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Check if user is authenticated with both token and login status
  const isAuthenticated = token && isLoggedIn;

  if (!isAuthenticated) {
    // Clear any invalid tokens
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isLoggedIn');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
