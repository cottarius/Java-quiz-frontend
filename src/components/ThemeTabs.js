import React from 'react';

const themes = [
    { path: '/all/', label: 'Все вопросы' },
    { path: '/primary/', label: 'Важные вопросы' },
    { path: '/core1/', label: 'Core 1' },
    { path: '/core2/', label: 'Core 2' },
    { path: '/core3/', label: 'Core 3' },
    { path: '/spring/', label: 'Spring' },
    { path: '/hibernate/', label: 'Hibernate' },
    { path: '/sql/', label: 'SQL' },
    { path: '/patterns/', label: 'Patterns' }
];

const ThemeTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="theme-tabs">
            {themes.map((theme) => (
                <button
                    key={theme.path}
                    className={`tab ${activeTab === theme.path ? 'active' : ''}`}
                    onClick={() => onTabChange(theme.path)}
                >
                    {theme.label}
                </button>
            ))}
        </div>
    );
};

export default ThemeTabs;