import React, { useState } from 'react';
import './SearchBar.css'; // добавь, если еще не подключён

const SearchBar = ({ onSearch, onSearchInAnswersChange }) => {
    const [query, setQuery] = useState('');
    const [searchInAnswers, setSearchInAnswers] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, searchInAnswers);
    };

    const toggleSearchInAnswers = () => {
        const newValue = !searchInAnswers;
        setSearchInAnswers(newValue);
        onSearchInAnswersChange(newValue);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск вопросов или ответов..."
                className="search-input"
            />

            <label className="search-checkbox">
                <input
                    type="checkbox"
                    checked={searchInAnswers}
                    onChange={toggleSearchInAnswers}
                />
                Искать в ответах
            </label>

            <button type="submit" className="search-button">
                🔍 Поиск
            </button>
        </form>
    );
};

export default SearchBar;