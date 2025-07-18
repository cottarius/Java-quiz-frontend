import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import ThemeTabs from '../components/ThemeTabs';
import QuestionCard from '../components/QuestionCard';
import SearchBar from '../components/SearchBar';
// import Navbar from '../components/Navbar';

const QuizPage = () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const { authToken, logout } = useAuth();

    const [activeTab, setActiveTab] = useState('/all/');
    const [questions, setQuestions] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInAnswers, setSearchInAnswers] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchQuestions = async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const headers = {};
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            setQuestions(data);
            setSearchResults(null);
        } catch (err) {
            setError(`Не удалось загрузить вопросы: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query, searchInAnswersFlag) => {
        const trimmedQuery = query.trim();
        setSearchQuery(trimmedQuery);
        if (!trimmedQuery) {
            setSearchResults(null);
            return;
        }

        setLoading(true);
        try {
            const headers = { 'Content-Type': 'application/json' };
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }

            const response = await fetch(
                `${API_BASE_URL}/search?query=${encodeURIComponent(trimmedQuery)}&searchInAnswers=${searchInAnswersFlag}`,
                { headers }
            );
            if (!response.ok) throw new Error(`Ошибка поиска: ${response.status}`);

            setSearchResults(await response.json());
            setSearchInAnswers(searchInAnswersFlag);
        } catch (err) {
            setError(`Ошибка при поиске: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authToken) {
            fetchQuestions(activeTab);
        }
    }, [activeTab, authToken]);

    const displayedQuestions = searchResults || questions;

    return (
        <div className="quiz-page">
            <div className="quiz-header">
                <div className="quiz-header-top">
                    <ThemeTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    <button className="logout-button" onClick={() => logout()}>
                        Выйти
                    </button>
                </div>
                <SearchBar onSearch={handleSearch} onSearchInAnswersChange={setSearchInAnswers} />
            </div>

            {loading && <div className="loading">Загрузка...</div>}
            {error && <div className="error">{error}</div>}

            <div className="questions-list">
                {displayedQuestions.map((question) => (
                    <QuestionCard key={question.id} question={question} highlight={searchQuery} />
                ))}
            </div>
        </div>
    );
};

export default QuizPage;