import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/SelectLanguagePage.css";

function SelectLanguagePage() {
    const { setLanguage } = useLanguage(); // Use the setLanguage function from context

    function handleLangImgClick(event) {
        const selectedLanguage = event.target.dataset.value;
        setLanguage(selectedLanguage); // Set the selected language using context
    }

    return (
        <div className="selectLanguagePage">
            <div className="selectLanguagePageContent">
                <div className="selectLanguagePageHeaders">
                    <h2>Welcome to the Container</h2>
                    <h3>Select a Language</h3>
                    <div className="languageButtons">
                        <div className="englishButton languageButton">
                            <img
                                src="/assets/images/england-flag.png"
                                className="languageFlag"
                                data-value="English"
                                onClick={handleLangImgClick}
                            />
                            <p>English</p>
                        </div>

                        <div className="hebrewButton languageButton">
                            <img
                                src="/assets/images/israel-flag.webp"
                                className="languageFlag"
                                data-value="Hebrew"
                                onClick={handleLangImgClick}
                            />
                            <p>עברית</p>
                        </div>
                    </div>
                </div>


                {/* notice */}
                <div className="notice">
                    <p>שימו ♥️</p>
                    <p>עקב המצב הבטחוני, משלוחים יתבצעו רק באיזור המרכז.</p>
                    <p>כמו כן, משלוחים באיזור יהודה ושומרון לא מתבצעים כרגע.</p>

                    <div className="noticeHostages">
                        <p>אנו מייחלים לימים שקטים יותר, ולהשבתם של כל החטופים. 🎗️</p>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default SelectLanguagePage;
