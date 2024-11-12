import React, { useState } from "react";
import StoreNav from "../../../components/StoreNav";
import Card from "../../../components/Card";
import fashionStoreItems from "../data/fashionStoreItemList";
import FashionStoreMenu from "./FashionStoreMenu";
import { useLanguage } from "../../../contexts/LanguageContext";
import "../styles/FashionStore.css";

function FashionStore() {
  // Access current language setting from context
  const { language } = useLanguage();
  const isEnglish = language.toLowerCase() === 'english';

  // State variables for filters and pagination
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Handle changes to category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBrand([]); // Reset brand when category changes
    setCurrentPage(1); // Reset to the first page
  };

  // Handle changes to brand filter
  const handleBrandChange = (brands) => {
    setSelectedBrand(brands);
    setSelectedCategory("all"); // Reset category when brand is selected
    setCurrentPage(1); // Reset to the first page
  };

  // Handle changes to color filter
  const handleColorChange = (colors) => {
    setSelectedColors(colors);
    setCurrentPage(1); // Reset to the first page
  };

  // Handle changes to price filter
  const handlePriceChange = (price) => {
    setSelectedPrice(price);
    setCurrentPage(1); // Reset to the first page
  };

  // Filter items based on selected filters
  const filteredItems = Object.entries(fashionStoreItems)
    .flatMap(([category, items]) =>
      items.filter(item => {
        // Check if item matches the selected category
        const matchesCategory = selectedCategory === "all" || category === selectedCategory;

        // Check if item matches selected brands
        const matchesBrand = selectedBrand.length === 0 || selectedBrand.includes(item.brand || '');

        // Check if item matches selected colors
        const itemColors = isEnglish ? item.colorsEnglish : item.colorsHebrew;
        const matchesColors = selectedColors.length === 0 ||
          (itemColors && selectedColors.every(color => itemColors.includes(color)));

        // Check if item matches selected price range
        const matchesPrice = !selectedPrice || item.priceRange === selectedPrice;

        return matchesCategory && matchesBrand && matchesColors && matchesPrice;
      })
    );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for the current page
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Format item for display
  const formatItem = (item) => ({
    id: item.id,
    title: isEnglish ? item.englishName : item.hebrewName,
    price: item.globalPrice ? `${item.globalPrice}` : "N/A",
    details: isEnglish ? item.englishDescription : item.hebrewDescription,
    imagePath: item.images[0],
    isInStock: item.inStock,
    typeOfItem: item.typeOfItem,
  });

  return (
    <section className="fashionStore">

      <div className="mainContent">
        {/* Filter menu */}
        <FashionStoreMenu
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedBrand={selectedBrand}
          onBrandChange={handleBrandChange}
          selectedColors={selectedColors}
          onColorChange={handleColorChange}
          selectedPrice={selectedPrice}
          onPriceChange={handlePriceChange}
        />

        <div className="fashionStoreCardContainer">
          {/* Display message if no items match the filters */}
          {filteredItems.length === 0 ? (
            <p className="noItemsMessage">
              {isEnglish 
                ? "No items match the selected filters." 
                : "לא נמצאו פריטים שמתאימים לפילטרים שנבחרו."}
            </p>
          ) : (
            // Display filtered items
            currentItems.map((item, idx) => (
              <Card
                key={idx}
                item={formatItem(item)}
              />
            ))
          )}
        </div>
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &laquo; Prev
    </button>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      Next &raquo;
    </button>
  </div>
);

export default FashionStore;
