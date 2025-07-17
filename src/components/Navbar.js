// Navbar.js
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="quiz-header-right">
                <button className="logout-button" onClick={logout}>Выйти</button>
            </div>
        </nav>
    );
};

export default Navbar;