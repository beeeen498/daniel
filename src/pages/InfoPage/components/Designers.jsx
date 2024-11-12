import React, { useState } from "react";
import designersInfo from "../data/designersInfo";
import "../style/Designers.css";

function Designers() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);

    const handleImageClick = (index) => {
        setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const designersArray = Object.values(designersInfo);

    return (
        <div className="designers">
            <h2 className="designersHeading">Four Enterprises Dominate the Fashion World</h2>
            <div className="desginersImages">
                {designersArray.map((designer, index) => (
                    <div
                        key={index}
                        className="designerContainer"
                        onClick={() => handleImageClick(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            className={`designerImage ${selectedIndex === index ? "colorful" : ""}`}
                            src={designer.imagePath}
                            alt={designer.name}
                        />
                        <div className="designerInfo">
                            <p className={`designerName ${selectedIndex === index || hoverIndex === index ? "visible" : ""}`}>
                                {designer.name}
                            </p>
                            <p className={`companyName ${selectedIndex === index || hoverIndex === index ? "visible" : ""}`}>
                                {designer.companyName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="desingersText">
                {selectedIndex === null ? (
                    <p className="placeholderText">Click on an image to learn more</p>
                ) : (
                    <p dangerouslySetInnerHTML={{ __html: designersArray[selectedIndex].text }}></p>
                )}
            </div>
        </div>
    );
}

export default Designers;
