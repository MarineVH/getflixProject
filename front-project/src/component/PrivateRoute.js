import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = () => {
    const token = localStorage.getItem('token');
    const isAuth = !!token; // Check if the token exists
    return isAuth ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login" });
};
export default PrivateRoute;
