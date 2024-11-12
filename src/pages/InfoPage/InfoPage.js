import React, { useState } from "react";
import CarouselCard from "./components/CarouselCard";
import companiesInfo from "./data/companiesInfo";
import { useLanguage } from '../../contexts/LanguageContext.js';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Designers from "./components/Designers.jsx";
import Article from "./components/Article.jsx";
import articlesData from "./data/articlesData.js";
import ArticlePage from "./components/ArticlePage.jsx";
import "../InfoPage/style/InfoPage.css";
import "../../styles/main.css";

function InfoPage() {
    // Retrieve the current language from context
    const { language } = useLanguage();

    // State for carousel index
    const [currentIndex, setCurrentIndex] = useState(4);

    // State for managing the selected article
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Get an array of company keys from the companiesInfo object
    const companyKeys = Object.keys(companiesInfo);

    // Function to handle the "Next" button click
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % companyKeys.length);
    };

    // Function to handle the "Prev" button click
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? companyKeys.length - 1 : prevIndex - 1
        );
    };

    // Function to get the transform style for each card
    const getItemStyle = (index) => {
        const distance = Math.abs(index - currentIndex);
        const maxDistance = 2; // Number of cards to be shown on each side

        const offset = distance * 120; // Distance between cards
        const scale = 1 - 0.2 * distance / 2;

        return {
            transform: `translateX(${index > currentIndex ? offset : -offset}px) scale(${scale})`,
            zIndex: -distance,
            filter: distance === 0 ? 'none' : 'blur(2px)',
        };
    };

    // Function to handle article click
    const handleArticleClick = (article) => {
        setSelectedArticle(article); // Set the selected article data
    };

    // Function to close the article popup
    const closePopUp = () => {
        setSelectedArticle(null); // Clear the selected article to close the popup
    };

    return (
        <div>
            <div className="infoPageMainContent">
                <Designers />

                <div className="carouselContainer">
                    {companyKeys.map((key, index) => {
                        const company = companiesInfo[key];
                        return (
                            <div
                                key={index}
                                style={getItemStyle(index)}
                                className={`carouselCard ${index === currentIndex ? 'focused' : 'blurred'}`}
                            >
                                <CarouselCard
                                    name={company.name}
                                    imagePath={company.imagePath}
                                    isFocused={index === currentIndex}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="textAndArrows">
                    <FaAngleLeft
                        size={40}
                        className="arrowIcon leftArrow"
                        onClick={handlePrev}
                    />
                    <p className="companyText">
                        {language === "English"
                            ? companiesInfo[companyKeys[currentIndex]].historyEn
                            : companiesInfo[companyKeys[currentIndex]].historyHe}
                    </p>
                    <FaAngleRight
                        size={40}
                        className="arrowIcon rightArrow"
                        onClick={handleNext}
                    />
                </div>

                {/* Articles Section */}
                <h2>Articles</h2>
                <section className="articlesSection">
                    {Object.values(articlesData).map(article => (
                        <Article
                            key={article.id}
                            id={article.id}
                            title={language === "English" ? article.titleEnglish : article.titleHebrew}
                            imagePath={article.imagePath}
                            copyright={article.copyright}
                            onClick={() => handleArticleClick(article)}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}

export default InfoPage;
