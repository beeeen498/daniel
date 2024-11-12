import React, { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useLanguage } from "../../../contexts/LanguageContext";
import homePageText from "../data/homePageText";
import "../styles/contact-us.css";
import emailjs from 'emailjs-com';

function ContactUs() {
    // Constants and Configurations
    const { language } = useLanguage();
    const currentContactText = homePageText[language.toLowerCase()].contact;
    const phoneNumber = '+972553000357'; // Replace with the phone number you want to chat with
    const messageEnglish = 'Hello! I have a question :)'; // Replace with the message you want to start with
    const messageHebrew = 'שלום! יש לי שאלה :)';
    const serviceID = 'service_ry6jrsq'; // Replace with your EmailJS service ID
    const templateID = 'template_t71zu3u'; // Replace with your EmailJS template ID
    const userID = '6YFaCsqGbV2qSsE-s'; // Replace with your EmailJS user ID
    const [emailIsSent, setEmailIsSent] = useState(false);

    // State Variables
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    // Event Handlers
    const handleClick = () => {
        window.open(`https://wa.me/${phoneNumber}/?text=${language === "English" ? messageEnglish : messageHebrew}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { firstName: "", lastName: "", email: "" };

        if (!formData.firstName.trim()) {
            newErrors.firstName = language === "Hebrew" ? "שדה שם פרטי חובה" : "First name is required.";
            isValid = false;
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = language === "Hebrew" ? "שדה שם משפחה חובה" : "Last name is required.";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = language === "Hebrew" ? "שדה אימייל חובה" : "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = language === "Hebrew" ? "כתובת אימייל אינה חוקית" : "Email is invalid.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            emailjs.send(serviceID, templateID, {
                user_name: `${formData.firstName} ${formData.lastName}`,
                user_email: formData.email,
                message: formData.message
            }, userID)
            .then(response => {
                setEmailIsSent(true);
                console.log('Email sent successfully:', response);
                // Optionally, you can reset the form or show a success message
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    message: "",
                });
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
        }
    };

    // Determine text alignment and direction based on language
    const textDirection = language === "Hebrew" ? "rtl" : "ltr";
    const textAlignmentClass = language === "Hebrew" ? "textRight" : "textLeft";

    // Render JSX
    return (
        <div>
            <section id="contactUs">
                <div className={`contactUsDiv ${textAlignmentClass}`}>
                    <div className={`contactUsDivText ${textAlignmentClass}`}>
                        <h2>{currentContactText.heading}</h2>
                        <p>{currentContactText.text}</p>
                    </div>

                    <form className="contactUsInput" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder={currentContactText.firstNamePlaceholder}
                            value={formData.firstName}
                            onChange={handleChange}
                            dir={textDirection}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                        
                        <input
                            type="text"
                            name="lastName"
                            placeholder={currentContactText.lastNamePlaceholder}
                            value={formData.lastName}
                            onChange={handleChange}
                            dir={textDirection}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}

                        <input
                            type="email"
                            name="email"
                            placeholder={currentContactText.emailPlaceholder}
                            className="emailInput"
                            value={formData.email}
                            onChange={handleChange}
                            dir={textDirection}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                        
                        <textarea
                            name="message"
                            placeholder={currentContactText.messagePlaceholder}
                            className="contactUsTextarea"
                            value={formData.message}
                            onChange={handleChange}
                            dir={textDirection}
                        />

                        <button 
                            type="submit" 
                            className={`${emailIsSent ? "contactUsButtonSent" : "contactUsButton"}`}
                        >
                            {emailIsSent ? currentContactText.messageSent : currentContactText.sendButton}
                        </button>
                    </form>

                    <div className="contactUsDivIcons">
                        <BsFillTelephoneFill className="phoneIcon icon" size={30} />
                        <IoLogoWhatsapp
                            className="whatsappIcon icon"
                            size={30}
                            onClick={handleClick}
                        />
                        {/* <MdEmail className="emailIco icon" size={30}/> */}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
