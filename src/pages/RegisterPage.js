// RegisterPage.js
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; // используем тот же CSS, что и для логина

const RegisterPage = () => {
    const { register } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            setMessage('Регистрация успешна');
            setError('');
            setTimeout(() => navigate('/login'), 2000); // переход на логин через 2 сек
        } catch (err) {
            setError('Ошибка регистрации');
            setMessage('');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="form-title">Регистрация</h2>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
                <button type="submit" className="form-button">
                    Зарегистрироваться
                </button>

                <div className="register-link">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;