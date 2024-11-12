import React from "react";
import Card from "./Card";
import "../styles/YouMayAlsoLike.css";
import fashionStoreItems from "../pages/FashionStore/data/fashionStoreItemList";
import artStoreItems from "../pages/ArtStore/data/artStoreItemsList";
import { useLanguage } from "../contexts/LanguageContext";

function YouMayAlsoLike({ excludeItemId }) {
    const { language } = useLanguage();
    const isEnglish = language.toLowerCase() === "english";
    
    // Function to flatten the artStoreItems object if necessary
    function flattenItems(itemsObject) {
        return Object.values(itemsObject).flat();
    }
    
    // Function to filter, shuffle, and select random items
    function getRandomItems(items, excludeId, count) {
        const filteredItems = items.filter(item => item.id !== excludeId);
        const shuffled = filteredItems.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    const formatItem = (item) => ({
        id: item.id,
        title: isEnglish ? item.englishName : item.hebrewName,
        price: isEnglish ? `${item.globalPrice}` : `${item.israelPrice}`,
        details: isEnglish ? `${item.englishDescription}` : item.hebrewDescription,
        imagePath: item.images[0],
        images: item.images,
        typeOfItem: item.typeOfItem,
    });

    // Flatten the art and fashion items
    const flattenedArtItems = flattenItems(artStoreItems);
    const flattenedFashionItems = flattenItems(fashionStoreItems);
    
    // Combine all items into a single array
    const allItems = [...flattenedFashionItems, ...flattenedArtItems];
    
    // Get random items excluding the current item
    const randomItems = getRandomItems(allItems, excludeItemId, 3);

    // Heading text based on language
    const headingText = isEnglish ? "You May Also Like" : "אולי יעניין אותך";

    return (
        <div className="youMayAlsoLikeDiv">
            <h2 className="youMayAlsoLikeHeading">{headingText}</h2>
            <div className="youMayAlsoLikeCardsContainer">
                {randomItems.map(item => (
                    <Card key={item.id} item={formatItem(item)} />
                ))}
            </div>
        </div>
    );
}

export default YouMayAlsoLike;
