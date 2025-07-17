// ThemeTabs.js
import React from 'react';
import './ThemeTabs.css';

const tabs = [
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
            {tabs.map(tab => (
                <button
                    key={tab.path} // ✅ исправлено
                    className={`tab-button ${activeTab === tab.path ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.path)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ThemeTabs;