
const API_URL = process.env.REACT_APP_API_URL;

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Ошибка входа: ' + response.status);
        }

        return response.json(); // должен содержать { token }
    },

    register: async (userData) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Ошибка регистрации: ' + errorText);
        }
    },

    logout: () => {
        localStorage.removeItem('authToken');
    }
};
