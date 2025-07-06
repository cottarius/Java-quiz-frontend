import React, { useState, useEffect } from 'react';
import ThemeTabs from './components/ThemeTabs';
import QuestionCard from './components/QuestionCard';
import SearchBar from './components/SearchBar';
import './styles.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('/all/');
    const [questions, setQuestions] = useState([]);
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInAnswers, setSearchInAnswers] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Загрузка вопросов по выбранной теме
    const fetchQuestions = async (endpoint) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080${endpoint}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            setQuestions(data);
            setSearchResults(null);
        } catch (err) {
            setError(`Не удалось загрузить вопросы: ${err.message}`);
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    // Поиск вопросов
    const handleSearch = async (query, searchInAnswersFlag) => {
        const trimmedQuery = query.trim();
        setSearchQuery(trimmedQuery);

        if (!trimmedQuery) {
            setSearchResults(null);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `http://localhost:8080/search?query=${encodeURIComponent(trimmedQuery)}&searchInAnswers=${searchInAnswersFlag}`
            );

            if (!response.ok) {
                throw new Error(`Ошибка поиска: ${response.status}`);
            }

            const data = await response.json();
            setSearchResults(data);
            setSearchInAnswers(searchInAnswersFlag);
        } catch (err) {
            setError(`Ошибка при поиске: ${err.message}`);
            console.error('Ошибка поиска:', err);
        } finally {
            setLoading(false);
        }
    };

    // Сброс поиска
    const resetSearch = () => {
        setSearchResults(null);
        setSearchQuery('');
    };

    // Загрузка вопросов при смене вкладки
    useEffect(() => {
        fetchQuestions(activeTab);
    }, [activeTab]);

    const displayedQuestions = searchResults || questions;
    const showNoResultsMessage = !loading && displayedQuestions.length === 0;

    return (
        <div className="app">
            <h1>Java Quiz</h1>

            <ThemeTabs
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    resetSearch();
                }}
            />

            <SearchBar
                onSearch={handleSearch}
                onSearchInAnswersChange={setSearchInAnswers}
                initialQuery={searchQuery}
            />

            {loading && (
                <div className="loading-indicator">
                    <div className="spinner"></div>
                    <span>Загрузка...</span>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            {searchResults && (
                <div className="search-info">
                    <p>
                        Найдено вопросов: <strong>{searchResults.length}</strong>
                        {searchInAnswers && ' (включая поиск в ответах)'}
                    </p>
                    <button
                        onClick={resetSearch}
                        className="btn btn-secondary"
                        aria-label="Очистить результаты поиска"
                    >
                        Очистить поиск
                    </button>
                </div>
            )}

            <div className="questions-list">
                {displayedQuestions.length > 0 ? (
                    displayedQuestions.map(question => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            searchQuery={searchQuery}
                            searchInAnswers={searchInAnswers}
                        />
                    ))
                ) : (
                    showNoResultsMessage && (
                        <div className="no-results">
                            <p>Вопросы не найдены</p>
                            {searchQuery && (
                                <button
                                    onClick={() => fetchQuestions(activeTab)}
                                    className="btn btn-link"
                                >
                                    Показать все вопросы
                                </button>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default App;