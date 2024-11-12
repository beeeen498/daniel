import React, { useState } from "react";
import "../style/Article.css";
import { useNavigate } from "react-router-dom";

function Article({ imagePath, copyright, title, id, onClick }) {
    const navigate = useNavigate();

    function handleArticleClick() {
        onClick({ id, imagePath, copyright, title });
        navigate(`/article/${id}`);
    }    


    return (
        <div className="article" onClick={handleArticleClick}>
            <div className="articleImageAndCopyright">
                <img src={imagePath} alt="article image" className="articleImage" />
                <p className="credit">&nbsp;{copyright}</p>
            </div>
            <h3>{title}</h3>
        </div>
    );
}

export default Article;
