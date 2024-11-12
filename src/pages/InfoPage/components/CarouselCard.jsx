import React from "react";
import "../style/CarouselCard.css";

function CarouselCard({ name, imagePath, isFocused }) {
    return (
        <div className={`carouselCard ${isFocused ? 'focused' : 'blurred'}`}>
            <div style={{ backgroundImage: `url(${imagePath})` }} className="companyLogo"></div>
            <h2 className="companyName">{name}</h2>
        </div>
    );
}

export default CarouselCard;
