import React from "react";
import "../styles/ImagePopUp.css";

function ImagePopUp({ isOpen, onClose, imageSrc, onNext, onPrev }) {
    if (!isOpen) return null;

    return (
        <div className="imagePopUpOverlay" onClick={onClose}>
            <div className="imagePopUpContent" onClick={(e) => e.stopPropagation()}>
                <img src={imageSrc} alt="Enlarged view" className="imagePopUpImage" />
                <button className="imagePopUpCloseButton" onClick={onClose}>X</button>

                <div className="imagePopUpCarouselButtonDiv">
                    {onPrev && (
                        <button className="imagePopUpCarouselButton left" onClick={onPrev}>
                            {"<"}
                        </button>
                    )}
                    {onNext && (
                        <button className="imagePopUpCarouselButton right" onClick={onNext}>
                            {">"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImagePopUp;
