import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/Card.css";

function Card({ item }) {
    const { language } = useLanguage();
    const navigate = useNavigate();

    console.log(item);

    if (!item) {
        return null;
    }

    const handleClick = () => {
        navigate(`/item/${item.id}`, { state: { item, allItems: [] } });
    };

    const title = language === "English" ? item.title : item.title;
    const price = language === "English" ? item.price : item.price;

    return (
        <div className="card" onClick={handleClick}>
            <div className="cardImageDiv">
                <img className="cardImage" src={item.imagePath} alt={title} />
                {!item.isInStock && <span className="outOfStockLabel">Sold Out</span>}
            </div>
            
            <div className="cardDetails">
                <h2 className="cardName">{title}</h2>
                <p className="cardPrice">{price}</p>
            </div>
        </div>
    );
}

export default Card;
