import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const isAuth = !!token; // Check if the token exists

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;