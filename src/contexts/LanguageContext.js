import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // Check if a language is already stored in localStorage
        return localStorage.getItem('language') || null;
    });

    // Save the selected language to localStorage whenever it changes
    useEffect(() => {
        if (language) {
            localStorage.setItem('language', language);
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prevLanguage => prevLanguage === "English" ? "Hebrew" : "English");
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
