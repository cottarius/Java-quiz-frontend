// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';

const useLogout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return () => {
        logout();           // очищает токен
        navigate('/login'); // переходит на логин
    };
};

export default useLogout;