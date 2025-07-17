import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Валидация
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            await register({ email, password });
            navigate('/login', { state: { registrationSuccess: true } });
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <button
                type="submit"
                style={{
                    padding: '10px 15px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Register
            </button>
        </form>
    );
};

export default RegisterForm;