import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useParams } from 'react-router-dom';
import articlesData from '../data/articlesData'; // Adjust the path to your actual data file
import "../style/ArticlePage.css";
import farfetchText from "../data/Farfetch.txt";
import virgilText from "../data/Virgil-Abloh.txt";

function ArticlePage() {
    const { language } = useLanguage();
    const { id } = useParams(); // Get the article ID from the URL
    const article = articlesData[id]; // Find the article by its ID

    console.log(virgilText);

    // If the article is not found, display a fallback message
    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="articlePage">
            <div className="articlePageDiv">
                <div className="articleImageAndCopyright">
                    <img className='articleImage articlePageImage' src={article.imagePath} alt={article.titleEnglish} />
                    <p className='credit articlePageCredit'>&nbsp;{article.copyright}</p>
                </div>

                {/* Article header */}
                <h1 className='articlePageHeading'>{language === "English" ? article.titleEnglish : article.titleHebrew}</h1>

                {/* Article text */}
                <pre className="articlePageText">
                    {language === "English" ? article.textEnglish : article.textHebrew}
                </pre>
            </div>
        </div>
    );
}

export default ArticlePage;
