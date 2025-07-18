import React, { useState, useMemo } from 'react';
import './QuestionCard.css'; // Добавим CSS-модуль или обычный файл

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text, query) => {
    if (!text || !query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.split(regex).map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ?
            <mark key={i} className="highlight">{part}</mark> :
            part
    );
};

const QuestionCard = ({ question, searchQuery = '', searchInAnswers = false }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const { highlightedQuestion, shouldHighlightAnswer } = useMemo(() => ({
        highlightedQuestion: searchQuery ? highlightText(question.question, searchQuery) : question.question,
        shouldHighlightAnswer: searchQuery && searchInAnswers
    }), [question.question, searchQuery, searchInAnswers]);

    const formatAnswerText = (text) => {
        if (!text) return null;

        return text
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .split('\n')
            .filter(line => line.trim())
            .map((paragraph, i) => (
                <div key={i} className="answer-paragraph">
                    {paragraph.split('\t').map((segment, j) => (
                        <span key={j} className={`answer-segment ${j > 0 ? 'tabbed' : ''}`}>
                            {shouldHighlightAnswer ? highlightText(segment, searchQuery) : segment}
                        </span>
                    ))}
                </div>
            ));
    };

    return (
        <div className={`question-card ${showAnswer ? 'expanded' : ''}`}>
            <div className="question-header">
                <h3 className="question-title">Вопрос #{question.id}</h3>
                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="toggle-button"
                >
                    {showAnswer ? 'Скрыть ответ' : 'Показать ответ'}
                </button>
            </div>

            <div className="question-text">
                {highlightedQuestion}
            </div>

            {showAnswer && (
                <div className="answer-section">
                    <strong className="answer-label">Ответ:</strong>
                    <div className="answer-content">
                        {formatAnswerText(question.answer)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(QuestionCard);