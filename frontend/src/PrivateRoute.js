// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    // console.log("authenticated", isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PrivateRoute;
