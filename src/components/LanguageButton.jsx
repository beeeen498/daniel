import React from 'react';
import { MdLanguage } from "react-icons/md";
import { useLanguage } from '../contexts/LanguageContext';
import "../styles/LanguageButton.css";

function LanguageButton() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="languageButtonAndIcon" onClick={toggleLanguage}>
            <MdLanguage size={30} className='languageIcon'/>
            <p>{language}</p>
        </div>
    );
}

export default LanguageButton;
