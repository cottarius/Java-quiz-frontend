// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { authToken } = useAuth();

    return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;