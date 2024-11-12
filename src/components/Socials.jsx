import React from "react";

import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { useLanguage } from "../contexts/LanguageContext";

import "../styles/socials.css"

function Socials(){
    const { language } = useLanguage();
    const messageEnglish = 'Hello! I have a question :)'; // Replace with the message you want to start with
    const messageHebrew = 'שלום! יש לי שאלה :)';
    const phoneNumber = '+972553000357';

    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}/?text=${language === "English" ? messageEnglish : messageHebrew}`);
    };

    return(
            <div className="socialMediaBlock">
                <ul className="socialMediaIcons">
                    <li className="icon"><a href="https://www.instagram.com/thecontainer.online/"><AiFillInstagram size={40}/></a></li>
                    <li className="icon"><a href=""><AiFillFacebook size={40}/></a></li>
                    <li className="icon"><a href=""><FaTiktok size={40}/></a></li>
                    <li className="icon"><a href=""><IoLogoWhatsapp size={40} onClick={handleClick}/></a></li>
                </ul>
            </div>
    );
};

export default Socials;