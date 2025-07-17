import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setAuthToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        const token = response.token;
        console.log('Token from login:', token);
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const register = async (userData) => {
        await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);