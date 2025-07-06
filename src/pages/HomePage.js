import React, { useState, useEffect } from 'react';
import { getQuestions } from '../services/QuestionService';
import ThemeTabs from '../components/ThemeTabs';
import QuestionCard from '../components/QuestionCard';

const HomePage = ({ onSearch }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('/all/');

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getQuestions(activeTab);
                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [activeTab]);

    return (
        <div className="home-page">
            <ThemeTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchBar onSearch={onSearch} />

            {loading && <p>Загрузка...</p>}
            {error && <p className="error">Ошибка: {error}</p>}

            <div className="questions-list">
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <QuestionCard key={question.id} question={question} />
                    ))
                ) : (
                    !loading && <p>Вопросы не найдены</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;