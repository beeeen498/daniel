import React from "react";

import "../styles/footer.css";

function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <div>
            <footer>
                <p>©{currentYear} | Created by Ben Kedem </p>
            </footer>
        </div>
    );
}

export default Footer; 