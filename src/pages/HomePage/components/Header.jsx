import React, { useState, useEffect } from "react";
import { GiShoppingBag } from "react-icons/gi";
import LanguageButton from "../../../components/LanguageButton";
import Socials from "../../../components/Socials";
import "../styles/header.css";
import StoreNav from "../../../components/StoreNav";

function Header() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>   
            <header className={`${isScrolled ? "scrolled" : ""}`}>
                {/* <div className="topSection">
                    <div className={`menuIcon`} onClick={handleClick}>
                        <div className={`line line1 ${isOpen ? "open" : ""}`}></div>
                        <div className={`line line2 ${isOpen ? "open" : ""}`}></div>
                    </div>
                    <h1>The Container</h1>

                    <div className="cartAndLanguageButton">

                    <GiShoppingBag size={40} />
                    </div>
                </div> */}

                <div className="hero">
                    <Socials />

                    <div className="heroVideoDiv">
                        {/* {isMenuOpen && <Nav isScrolled={isScrolled} />} */}
                        <video autoPlay loop muted className="heroVideo">
                            <source src="/assets/videos/hero-video-1080.mp4" type="video/mp4" />
                            {console.log(`Your browser does not support the video tag.`)}
                        </video>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
