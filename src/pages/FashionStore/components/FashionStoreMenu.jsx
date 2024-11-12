import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLanguage } from "../../../contexts/LanguageContext";
import fashionStoreItems from "../data/fashionStoreItemList";
import "../styles/FashionStoreMenu.css";

const FashionStoreMenu = ({ selectedCategory, onCategoryChange, selectedBrand, onBrandChange, selectedColors, onColorChange, selectedPrice, onPriceChange}) => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const { language } = useLanguage();
    const isEnglish = language.toLowerCase() === "english";

    const toggleAccordion = (accordionName) => {
        setOpenAccordion(prevAccordion =>
            prevAccordion === accordionName ? null : accordionName
        );
    };

    const handleSelectionChange = (filterType, value, checked) => {
        const updateSelection = (selectedValues) => {
            if (!Array.isArray(selectedValues)) {
                selectedValues = [];
            }
            return checked
                ? [...selectedValues, value]
                : selectedValues.filter(item => item !== value);
        };
    
        switch (filterType) {
            case 'category':
                onBrandChange([]);
                onColorChange([]);
                onPriceChange(null);
                onCategoryChange(value);
                break;
            case 'brand':
                if (value === "all") {
                    onBrandChange([]);
                } else {
                    const updatedBrands = updateSelection(selectedBrand);
                    onBrandChange(updatedBrands.length > 0 ? updatedBrands : []);
                    onColorChange([]);
                    onPriceChange(null);
                }
                break;
            case 'color':
                if (value === "all") {
                    onColorChange([]);
                } else {
                    onBrandChange([]);
                    onColorChange(updateSelection(selectedColors));
                    onPriceChange(null);
                }
                break;
            case 'price':
                onPriceChange(value);
                break;
            default:
                break;
        }
    };
    
    const getUniqueOptions = (items, field) => {
        const options = Object.values(items)
            .flat()
            .flatMap(item => item[field] || [])
            .filter(Boolean);
        return [...new Set(options)].sort((a, b) => a.localeCompare(b));
    };

    const uniqueBrands = ["all", ...getUniqueOptions(fashionStoreItems, 'brand')];
    const uniqueColors = ["all", ...getUniqueOptions(fashionStoreItems, isEnglish ? 'colorsEnglish' : 'colorsHebrew')];

    const categoryOptions = {
        english: ['all', 'shirts', 'sweatshirts', 'shoes', 'bags', 'belts', 'wallets'],
        hebrew: ['הכל', 'חולצות', 'סווטשירטים', 'נעליים', 'תיקים', 'חגורות', 'ארנקים',]
    };

    // Map Hebrew categories to corresponding English values
    const categoryMap = {
        הכל: 'all',
        חולצות: 'shirts',
        סווטשירטים: 'sweatshirts',
        נעליים: 'shoes',
        תיקים: 'bags',
        חגורות: 'belts',
        ארנקים: 'wallets'
    };

    const renderFilterOptions = (options, filterType, selectedOptions) => (
        options.map(option => (
            <div key={option}>
                <input
                    type={filterType === 'category' || filterType === 'price' || option === "all" ? 'radio' : 'checkbox'}
                    id={option}
                    name={filterType}
                    value={option}
                    checked={
                        filterType === 'category' || filterType === 'price'
                            ? selectedCategory === (filterType === 'category' && !isEnglish ? categoryMap[option] : option)
                            : filterType === 'brand' && option === 'all'
                            ? selectedBrand.length === 0
                            : filterType === 'color' && option === 'all'
                            ? selectedColors.length === 0
                            : selectedBrand.includes(option) || selectedColors.includes(option)
                    }
                    onChange={e => handleSelectionChange(filterType, filterType === 'category' && !isEnglish ? categoryMap[option] : option, e.target.checked)}
                />
                <label className="optionLabel" htmlFor={option}>{option}</label><br />
            </div>
        ))
    );

    const Accordion = ({ title, selectedOption, isOpen, toggleAccordion, children }) => (
        <div className="storeMenuAccordionSelection">
            <div className="storeMenuAccordionSelectionMain" onClick={toggleAccordion}>
                <div className="storeMenuAccordionCategory">{title}</div>
                <div className="storeMenuAccordionOptions">{selectedOption}</div>
                <div className={`storeMenuArrowIcon ${language !== "English" ? "storeMenuArrowIconHebrew" : ""}`}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {isOpen && <div className="storeMenuAccordionContent">{children}</div>}
        </div>
    );

    return (
        <div className="storeMenu">
            {/* Category Accordion */}
            <Accordion
                title={isEnglish ? "Category" : "קטגוריה"}
                selectedOption={selectedCategory === "all"
                    ? (isEnglish ? "All" : "הכל")
                    : isEnglish 
                        ? categoryOptions.english.find(opt => opt === selectedCategory)
                        : categoryOptions.hebrew[categoryOptions.english.indexOf(selectedCategory)]
                }
                isOpen={openAccordion === 'category'}
                toggleAccordion={() => toggleAccordion('category')}
            >
                {renderFilterOptions(categoryOptions[isEnglish ? 'english' : 'hebrew'], 'category', [selectedCategory])}
            </Accordion>

            {/* Brands Accordion */}
            <Accordion
                title={isEnglish ? "Brands" : "חברה"}
                selectedOption={
                    selectedBrand.length === 0
                        ? (isEnglish ? "All" : "הכל")
                        : selectedBrand.length > 1
                            ? (isEnglish ? "Multiple" : "רבים")
                            : selectedBrand.join(", ")
                }
                isOpen={openAccordion === 'brands'}
                toggleAccordion={() => toggleAccordion('brands')}
            >
                {renderFilterOptions(uniqueBrands, 'brand', selectedBrand)}
            </Accordion>

            {/* Colors Accordion */}
            <Accordion
                title={isEnglish ? "Colors" : "צבעים"}
                selectedOption={selectedColors.length === 0
                    ? (isEnglish ? "Select" : "בחר")
                    : selectedColors.length > 1
                        ? (isEnglish ? "Multiple" : "רבים")
                        : selectedColors.join(", ")}
                isOpen={openAccordion === 'colors'}
                toggleAccordion={() => toggleAccordion('colors')}
            >
                {renderFilterOptions(uniqueColors, 'color', selectedColors)}
            </Accordion>

        </div>
    );
};

export default FashionStoreMenu;
