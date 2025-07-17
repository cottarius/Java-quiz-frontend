const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getQuestions = async (endpoint, token) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    if (!response.ok) throw new Error('Ошибка загрузки вопросов');
    return await response.json();
};

export const searchQuestions = async (query, token, searchInAnswers = false) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}/search?query=${encodeURIComponent(query)}&searchInAnswers=${searchInAnswers}`,
        { headers }
    );
    if (!response.ok) throw new Error('Ошибка при поиске');
    return await response.json();
};