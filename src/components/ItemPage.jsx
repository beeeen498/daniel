import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import YouMayAlsoLike from "./YouMayAlsoLike";
import ImagePopUp from "./ImagePopUp";
import returnPolicyData from "../data/returnPolicyData";
import takingCareData from "../data/takingCareData";
import artStoreItems from '../pages/ArtStore/data/artStoreItemsList';
import fashionStoreItems from '../pages/FashionStore/data/fashionStoreItemList';
import "../styles/ItemPage.css";

function ItemPage() {
    // Get the current language from context
    const { language } = useLanguage();
    const isEnglish = language.toLowerCase() === "english";
    const { id } = useParams(); // Get the item ID from the URL parameters
    const navigate = useNavigate(); // Hook to navigate programmatically

    // State management for the item, all items, current image index, and pop-up visibility
    const [item, setItem] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [isReturnPolicyOpen, setIsReturnPolicyOpen] = useState(false);
    const [istakingCareOpen, setIstakingCareOpen] = useState(false);

    // Extract return policy data based on language
    const {
        artReturnPolicyEnglish,
        artReturnPolicyHebrew,
        fashionReturnPolicyEnglish,
        fashionReturnPolicyHebrew
    } = returnPolicyData;

    // Extract taking care data based on language
    const {
        takingCareEnglish,
        takingCareHebrew,
    } = takingCareData;


    // Effect to fetch item data based on the item ID
    useEffect(() => {
        const fetchItemData = () => {
            // Combine all items from different categories into one array
            const allItemsArray = [
                // art
                ...artStoreItems.vase,
                ...artStoreItems.tableware,
                ...artStoreItems.cups,
                ...artStoreItems.bowls,
                ...artStoreItems.plates,
                ...artStoreItems.ashtrays,
                ...artStoreItems.pots,

                // fashion
                ...fashionStoreItems.shirts,
                ...fashionStoreItems.sweatshirts,
                ...fashionStoreItems.bags,
                ...fashionStoreItems.belts,
                ...fashionStoreItems.shoes,
                ...fashionStoreItems.wallets, 
            ];

            // Find the item by ID
            const foundItem = allItemsArray.find(item => item.id === id);

            // If found, set the item and all items; otherwise, navigate to error page
            if (foundItem) {
                setItem(foundItem);
                setAllItems(allItemsArray);
            } else {
                console.error("Item not found!");
                navigate("/error");
            }
        };

        fetchItemData();
    }, [id, navigate]);

    // Show a loading message until the item is fetched
    if (!item) {
        return <div>Loading item details...</div>;
    }

    const images = item.images || []; // Use item's images or default to an empty array
    const mainImage = images.length ? images[currentImageIndex] : item.imagePath; // Set main image based on current index

    // Handle thumbnail image click to update the current image index
    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
    };

    // Handle carousel navigation to change the current image index
    const handleCarouselClick = (direction) => {
        setCurrentImageIndex((prevIndex) =>
            direction === "left"
                ? (prevIndex === 0 ? images.length - 1 : prevIndex - 1)
                : (prevIndex === images.length - 1 ? 0 : prevIndex + 1)
        );
    };

    // Open the image pop-up and prevent body scrolling
    const openPopUp = () => {
        setIsPopUpOpen(true);
        document.body.style.overflow = 'hidden'; 
    };

    // Close the image pop-up and restore body scrolling
    const closePopUp = () => {
        setIsPopUpOpen(false);
        document.body.style.overflow = ''; 
    };

    // Toggle the return policy visibility
    const toggleReturnPolicy = () => {
        setIsReturnPolicyOpen(prevState => !prevState);
    };

    // Get the appropriate return policy text based on the item type and language
    const getReturnPolicyText = () => {
        if (item.typeOfItem === "art") {
            return isEnglish ? artReturnPolicyEnglish : artReturnPolicyHebrew;
        } else if (item.typeOfItem === "fashion") {
            return isEnglish ? fashionReturnPolicyEnglish : fashionReturnPolicyHebrew;
        }
        return '';
    };

    // Toggle the taking care visibility
    const toggleTakingCare = () => {
        setIstakingCareOpen(prevState => !prevState);
    }

    // Get the current URL for sharing
    const shareUrl = window.location.href;

    return (
        <div className="itemPage">
            <div className="itemPageMainContent">
                <div className="itemPageMainContentLeft">
                    <div className="mainImage">
                        <div className="currentMainImage" onClick={openPopUp}>
                            <img src={mainImage} alt={item.title} className="carouselImage" />
                        </div>
                        {images.length > 1 && (
                            <div className="carouselButtonsDiv">
                                <button className="carouselButton left" onClick={() => handleCarouselClick("left")}>{"<"}</button>
                                <button className="carouselButton right" onClick={() => handleCarouselClick("right")}>{">"}</button>
                            </div>
                        )}
                    </div>
                    <div className="otherImages">
                        {images.length > 1 && images.map((img, index) => (
                            <div key={index} className={`otherImage ${currentImageIndex === index ? 'active' : ''}`} onClick={() => handleThumbnailClick(index)}>
                                <img src={img} alt={`Item image ${index + 1}`} className="thumbnailImage" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`itemPageMainContentRight ${!isEnglish ? "rtl" : ""}`}>
                    <div className="text">
                        <h2 className="itemHeading">{isEnglish ? item.englishName : item.hebrewName}</h2>
                        <p className="itemDescription">{isEnglish ? item.englishDescription : item.hebrewDescription}</p>
                        <p className="itemPrice">{isEnglish ? item.globalPrice : item.israelPrice}</p>
                        <div className="checkIfAvailableButtonDiv">
                            <button className="checkIfAvailableButton">{language === "English" ? "More Info" : "מידע נוסף"}</button>
                        </div>
                    </div>

                    
                    <div className="returnAndCareDiv" style={{ whiteSpace: 'pre-line' }}>
                        {/* return and shipphing */}
                        <div className="returnPolicyDiv">
                            <div className="returnPolicyHeadingAndArrow" onClick={toggleReturnPolicy}>
                                <h3 className="returnPolicyHeading">{language === "English" ? "Return Policy and Shipping" : "מדיניות החזרה ומשלחים"}</h3>
                                {isReturnPolicyOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                            {isReturnPolicyOpen && (
                                <div className="returnPolicyText">
                                    {getReturnPolicyText().split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* taking care */}
                        {item.typeOfItem === "art" && (
                            <div className="returnPolicyDiv">
                                <div className="returnPolicyHeadingAndArrow" onClick={toggleTakingCare}>
                                    <h3 className="returnPolicyHeading">
                                        {language === "English" ? "Care Instructions" : "הוראות טיפול"}
                                    </h3>
                                    {istakingCareOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </div>
                                {istakingCareOpen && (
                                    <div className="returnPolicyText">
                                       {isEnglish ? takingCareEnglish : takingCareHebrew}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* empty div */}
                    <div className="emptyDiv"></div>
                </div>
            </div>

            {/* sharew item */}
            <div className="itemShare">
                <p>{language === "English" ? "Share" : "שיתוף"}</p>
                <FaWhatsapp
                    className="icon"
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this item!')} ${encodeURIComponent(shareUrl)}`, '_blank')}
                    size={20}
                />
                <CiFacebook
                    className="icon"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    size={20}
                />
                <FaXTwitter
                    className="icon"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this item!')}`, '_blank')}
                    size={20}
                />
            </div>

            <YouMayAlsoLike allItems={allItems} excludeItemId={item.id} />

            <ImagePopUp
                isOpen={isPopUpOpen}
                onClose={closePopUp}
                imageSrc={mainImage}
                onNext={() => handleCarouselClick("right")}
                onPrev={() => handleCarouselClick("left")}
            />
        </div>
    );
}

export default ItemPage;
