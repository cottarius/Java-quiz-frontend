import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // ✅ переход на главную после успешного входа
        } catch (err) {
            setError('Неверные учетные данные');
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Вход</h2>
                {error && <div className="error">{error}</div>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;