import React from "react";
import Card from "../../../components/Card";
import { Link } from 'react-router-dom';
import featuredArtItems from "../data/featuredArtItems";
import featuredFashionItems from "../data/featuredFashionItems";
import { useLanguage } from '../../../contexts/LanguageContext';
import homePageText from "../data/homePageText";
import artStoreItems from "../../ArtStore/data/artStoreItemsList";
import "../styles/featured-items.css";

function FeaturedItems() {
    const { language } = useLanguage();
    const currentFeaturedItemsText = homePageText[language.toLowerCase()].featuredItems;
    const isEnglish = language.toLowerCase() === 'english';

    // Map through the items and format them accordingly
    const formatItem = (item) => ({
        title: isEnglish ? item.englishName : item.hebrewName,
        price: item.globalPrice ? `${item.globalPrice}` : "N/A",
        details: isEnglish ? item.englishDescription : item.hebrewDescription,
        imagePath: item.images[0],
        isInStock: item.inStock,
    });

    return (
        <div>
            <section className="featuredItems">

                {/* fashion items */}
                <div className="featuredItemsFashionRow">
                    <div className="featuredItemsFashionRowTextAndButton">
                        <div className="featuredItemsFashionRowText">
                            <h2 className="featuredItemsFashionRowH2">{currentFeaturedItemsText.featuredFashionItemsHeading}</h2>
                            <p className="featuredItemsFashionRowP">
                                {currentFeaturedItemsText.featuredFashionItemsText}
                            </p>
                        </div>
                        <button className="featuredItemsFashionRowButton">
                            <Link to="/fashion">{currentFeaturedItemsText.buttonText}</Link>
                        </button>
                    </div>

                    <div className="featuredItemsFashionRowCards">
                        {featuredFashionItems.map((item, idx) => (
                            <Card
                                key={idx}
                                item={formatItem(item)}
                                className={"featuredItemsRotatingCard"}
                            />
                        ))}
                    </div>
                </div>

                {/* art items */}
                <div className="featuredItemsArtRow">
                    <div className="featuredItemsArtRowTextAndButton">
                        <div className="featuredItemsArtRowText">
                            <h2 className="featuredItemsArtRowH2">{currentFeaturedItemsText.featuredArtItemsHeading}</h2>
                            <p className="featuredItemsArtRowP">{currentFeaturedItemsText.featuredArtItemsText}</p>
                        </div>
                        <button className="featuredItemsArtRowButton">
                            <Link to="/art">{currentFeaturedItemsText.buttonText}</Link>
                        </button>
                    </div>

                    <div className="featuredItemsArtRowCards">
                        {featuredArtItems.map((item, idx) => (
                            <Card
                                key={idx}
                                item={formatItem(item)}
                                className={"featuredItemsRotatingCard"}
                            />
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
};

export default FeaturedItems;
