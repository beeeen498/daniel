import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/StoreNav.css";
import { useLanguage } from '../contexts/LanguageContext';
import navText from "../data/navText.js";
import LanguageButton from "./LanguageButton.jsx";

function StoreNav({ isScrolled }) {
    const { language } = useLanguage();
    const currentNavText = navText[language.toLowerCase()].navText;
    const navigate = useNavigate();

    function handleNavClick(event, target) {
        event.preventDefault();

        if (target === 'about' || target === 'contactUs') {
            navigate(`/#${target}`);
        } else {
            navigate(`/${target}`);
        }
    }

    return (
        <div className="storeNav">
            <div className="storeNavTop">
                <LanguageButton />
                <h1 className="storeNavHeading"><Link to="/">the container</Link></h1>
                <div className="storeNavEmptyDiv"></div>
            </div>

            <nav className="storeNavBottom">
                <ul className={`${isScrolled ? "scrolledNav" : "storeNavList"} ${language === 'Hebrew' ? 'storeNavHebrew' : ''}`}>
                    <li className="storeNavItem"><Link to="/">{currentNavText.home}</Link></li>
                    <li className="storeNavItem">
                        <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                            {currentNavText.about}
                        </a>
                    </li>
                    <li className="storeNavItem"><Link to="/fashion">{currentNavText.fashion}</Link></li>
                    <li className="storeNavItem"><Link to="/art">{currentNavText.art}</Link></li>
                    <li className="storeNavItem"><Link to="/info">{currentNavText.info}</Link></li>
                    {/* <li className="storeNavItem"><a href="#dictionary">{currentNavText.dictionary}</a></li> */}
                    <li className="storeNavItem">
                        <a href="#contactUs" onClick={(e) => handleNavClick(e, 'contactUs')}>
                            {currentNavText.contact}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default StoreNav;
