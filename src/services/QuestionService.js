const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://93.183.68.60:8080/';

export const getQuestions = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

export const searchQuestions = async (query, currentIndex = 0) => {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}&currentIndex=${currentIndex}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};