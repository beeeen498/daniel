import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "../styles/RotatingCard.css";

function RotatingCard({ title, price, details, imageUrl }) {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleFlipCard = (e) => {
        // Check if the click is on the button, if so, prevent the card click handler from firing
        if (!e.target.closest('button')) {
            const itemName = title.replace(/\s+/g, '-').toLowerCase();
            navigate(`/item/${itemName}`);
        }
    };

    const handleViewDetailsClick = (e) => {
        e.stopPropagation(); // Prevent the card click handler from firing
        const itemName = title.replace(/\s+/g, '-').toLowerCase();
        navigate(`/item/${itemName}`);
        console.log("click");
    };

    return (
        <div 
            className={`rotatingCard ${isClicked ? 'spin' : ''}`} 
            onClick={handleFlipCard}
        >
            <div className="cover" style={{ backgroundImage: `url(${imageUrl})` }}>
                <h1>{title}</h1>
                <span className="price">{price}</span>

                <div className="cardBack">
                    <IoMdClose className="rotatingCardCloseIcon" size={25}/>

                    <div className="cardBackDetails">
                        <p>{details}</p>
                        <button onClick={handleViewDetailsClick}>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RotatingCard;
