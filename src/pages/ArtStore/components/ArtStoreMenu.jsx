import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLanguage } from "../../../contexts/LanguageContext";
import artStoreItems from "../data/artStoreItemsList";
import "../styles/ArtStoreMenu.css";

const ArtStoreMenu = ({ selectedCategory, onCategoryChange, selectedNumOfItems, onNumOfItemsChange }) => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const { language } = useLanguage();
    const isEnglish = language.toLowerCase() === "english";

    const toggleAccordion = (accordionName) => {
        setOpenAccordion((prevAccordion) =>
            prevAccordion === accordionName ? null : accordionName
        );
    };

    const handleSelectionChange = (filterType, value) => {
        switch (filterType) {
            case "category":
                onCategoryChange(value);
                break;
            case "numOfItems":
                onNumOfItemsChange(value);
                break;
            default:
                break;
        }
    };

    const categoryOptions = {
        english: ["all", "tableware", "vase", "cups", "bowls", "pots", "plates", "ashtrays"],
        hebrew: ["הכל", "כלי שולחן", "אגרטלים", "כוסות", "קערות", "כדים", "צלחות הגשה", "מאפרות"],
    };

    const categoryMap = {
        "הכל": "all",
        "כלי שולחן": "tableware",
        "אגרטלים": "vase",
        "כוסות": "cups",
        "קערות": "bowls",
        "כדים" : "pots",
        "צלחות הגשה": "plates",
        "מאפרות": "ashtrays",
    };

    const getUniqueNumOfItems = (artStoreItems) => {
        const numOfItemsArray = [];
        for (const category in artStoreItems) {
            if (artStoreItems.hasOwnProperty(category)) {
                artStoreItems[category].forEach(item => {
                    numOfItemsArray.push(item.numOfItems);
                });
            }
        }
        const uniqueNumOfItems = [...new Set(numOfItemsArray)].sort((a, b) => a - b);
        uniqueNumOfItems.unshift("all"); // Add "all" as the first option
        return uniqueNumOfItems;
    };

    const uniqueItems = getUniqueNumOfItems(artStoreItems);

    const renderFilterOptions = (options, filterType) =>
        options.map((option) => (
            <div key={option}>
                <input
                    type="radio"
                    id={option}
                    name={filterType}
                    value={option}
                    checked={
                        filterType === "category"
                            ? selectedCategory ===
                              (!isEnglish ? categoryMap[option] : option)
                            : filterType === "numOfItems"
                            ? selectedNumOfItems === option
                            : false
                    }
                    onChange={(e) =>
                        handleSelectionChange(
                            filterType,
                            !isEnglish && filterType === "category"
                                ? categoryMap[option]
                                : option
                        )
                    }
                />
                <label className="optionLabel" htmlFor={option}>
                    {option === "all" ? (isEnglish ? "All" : "הכל") : option}
                </label>
                <br />
            </div>
        ));

    const Accordion = ({ title, selectedOption, isOpen, toggleAccordion, children }) => (
        <div className="storeMenuAccordionSelection">
            <div className="storeMenuAccordionSelectionMain" onClick={toggleAccordion}>
                <div className="storeMenuAccordionCategory">{title}</div>
                <div className="storeMenuAccordionOptions">{selectedOption}</div>
                <div className={`storeMenuArrowIcon ${!isEnglish ? "storeMenuArrowIconHebrew" : ""}`}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {isOpen && <div className="storeMenuAccordionContent">{children}</div>}
        </div>
    );

    return (
        <div className="storeMenu">
            <Accordion
                title={isEnglish ? "Category" : "קטגוריה"}
                selectedOption={
                    selectedCategory === "all"
                        ? isEnglish
                            ? "All"
                            : "הכל"
                        : isEnglish
                        ? categoryOptions.english.find(
                              (opt) => opt === selectedCategory
                          )
                        : categoryOptions.hebrew[
                              categoryOptions.english.indexOf(selectedCategory)
                          ]
                }
                isOpen={openAccordion === "category"}
                toggleAccordion={() => toggleAccordion("category")}
            >
                {renderFilterOptions(categoryOptions[isEnglish ? "english" : "hebrew"], "category")}
            </Accordion>

            <Accordion
                title={isEnglish ? "Number of Items" : "מספר פריטים"}
                selectedOption={
                    selectedNumOfItems === "all"
                        ? isEnglish
                            ? "All"
                            : "הכל"
                        : selectedNumOfItems
                }
                isOpen={openAccordion === "numOfItems"}
                toggleAccordion={() => toggleAccordion("numOfItems")}
            >
                {renderFilterOptions(uniqueItems, "numOfItems")}
            </Accordion>
        </div>
    );
};

export default ArtStoreMenu;
