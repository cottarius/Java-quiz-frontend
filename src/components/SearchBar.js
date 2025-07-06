import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSearchInAnswersChange }) => {
    const [query, setQuery] = useState('');
    const [searchInAnswers, setSearchInAnswers] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, searchInAnswers);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск вопросов..."
                className="search-input"
            />

            <div className="search-options">
                <label className="search-option">
                    <input
                        type="checkbox"
                        checked={searchInAnswers}
                        onChange={() => {
                            const newValue = !searchInAnswers;
                            setSearchInAnswers(newValue);
                            onSearchInAnswersChange(newValue);
                        }}
                    />
                    Искать в ответах
                </label>
            </div>

            <button type="submit" className="btn btn-primary">
                Поиск
            </button>
        </form>
    );
};

export default SearchBar;