import React, { useState } from "react";
import artStoreItems from "../data/artStoreItemsList";
import Card from "../../../components/Card";
import ArtStoreMenu from "./ArtStoreMenu";
import { useLanguage } from "../../../contexts/LanguageContext";
import "../styles/artStorePage.css";

function ArtStore() {
    const { language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedNumOfItems, setSelectedNumOfItems] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12); // Default number of items per page
    const isEnglish = language.toLowerCase() === "english";

    // Handle category change and reset page number
    const handleCategoryChange = (newCategory) => {
        setSelectedCategory(newCategory);
        setCurrentPage(1); // Reset to first page when category changes
    };

    // Handle number of items filter change and reset page number
    const handleNumOfItemsChange = (num) => {
        setSelectedNumOfItems(num);
        setCurrentPage(1); // Reset to first page when number of items filter changes
    };

    // Filter items based on selected category
    let filteredItems = selectedCategory === "all"
        ? Object.values(artStoreItems).flat()
        : artStoreItems[selectedCategory] || [];

    // Further filter items based on number of items in the set
    if (selectedNumOfItems !== "all") {
        filteredItems = filteredItems.filter(item => item.numOfItems === parseInt(selectedNumOfItems, 10));
    }

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Get items for the current page
    const currentItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Format items for the Card component
    const formatItem = (item) => ({
        id: item.id,
        title: isEnglish ? item.englishName : item.hebrewName,
        price: isEnglish ? `${item.globalPrice}` : `${item.israelPrice}`,
        details: isEnglish ? `${item.englishDescription}` : item.hebrewDescription,
        imagePath: item.images[0],
        images: item.images, // Pass the entire images array
        isInStock: item.inStock, // Ensure `isInStock` is passed here
        typeOfItem: item.typeOfItem,
    });    

    return (
        <section className="artStore">
            {/* <div className="testText">
                <h1>צלחות הגשה</h1>
                <p>בקטגוריית הצלחות שלנו תמצאו פריטים מעוצבים עם תשומת לב לפרטים הקטנים, שמביאים לידי ביטוי את האומנות שבכל ארוחה. כל צלחת היא לא רק כלי, אלא גם יצירת אמנות שתוסיף צבע, יצירתיות וסטייל לשולחן שלכם. בין אם מדובר באירועים חגיגיים או בארוחות יומיומיות, הצלחות שלנו ישדרגו כל חוויה קולינרית ויהפכו אותה למיוחדת במינה.</p>
            </div> */}

            <div className="mainContent">
                <ArtStoreMenu
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    selectedNumOfItems={selectedNumOfItems} // Set selected number of items filter
                    onNumOfItemsChange={handleNumOfItemsChange} // Handle change in number of items filter
                />

                <div className="cards">
                    {currentItems.map((item, idx) => (
                        <Card key={idx} item={formatItem(item)} />
                    ))}
                </div>
            </div>

            <div className="paginationDiv">
                <div className="pagination">

                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>
                            Previous
                        </button>
                    )}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ArtStore;
