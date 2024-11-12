import React, { useEffect, useState } from "react";
import quotes from "../data/designerQuotes";
import { useLanguage } from '../../../contexts/LanguageContext';
import homePageText from "../data/homePageText";
import "../styles/about.css";

function About() {
    const { language } = useLanguage();
    const currentAboutText = homePageText[language.toLowerCase()].about;

    const QuoteCarousel = () => {
        const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
        const [fade, setFade] = useState(false);

        const rotateQuotes = () => {
            setFade(true);
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                setFade(false);
            }, 2000); // Ensure this matches your CSS transition duration
        };

        useEffect(() => {
            const intervalId = setInterval(rotateQuotes, 7000); // Change the interval to 5 seconds

            return () => clearInterval(intervalId);
        }, []);

        return (
            <div className="gridItem6">
                <h2 className={fade ? 'fadeOut' : ''}>&ldquo;{quotes[currentQuoteIndex].quote}&rdquo;</h2>
                <p className={fade ? 'fadeOut' : ''}>- {quotes[currentQuoteIndex].name}</p>
            </div>
        );
    };

    return (
        <div>
            <section id="about">
                <div className="aboutGrid">

                    {/* Endless marquee */}
                    <div className="gridItem1">
                        <p className="slidingAboutText">- 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT</p>
                        <p className="slidingAboutText slidingAboutTextSecond">- 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT - 100% LEGIT</p>
                    </div>

                    {/* About us heading */}
                    <div className="gridItem2">
                        <h2>{currentAboutText.heading}</h2>
                    </div>
                    
                    {/* Pink bag image */}
                    <div className="gridItem3">
                        <img className="grid3ItemImage" src="/assets/images/about/pink_prada_bag.jpg" alt="pink prada bag" />
                    </div>

                    {/* Pot image */}
                    <div className="gridItem5">
                        <img className="gridItem5Image" src="/assets/images/about/vase.jpg" alt="handmade clay vase" />
                    </div>
                    
                    {/* Quote carousel */}
                    <QuoteCarousel />
                    
                    {/* Main text */}
                    <div className="gridItem7">
                        <p>{currentAboutText.text}</p>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default About;
