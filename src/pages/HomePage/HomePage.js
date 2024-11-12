import React from "react";
import Header from "./components/Header"
import FeaturedItems from "./components/FeaturedItems";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import "../../styles/main.css"

import Card from "../../components/Card";


function HomePage(){
    return(
        <div>
            <Header />
            <FeaturedItems />
            <About />
            <ContactUs />
            <Card />
        </div>  
    );
}

export default HomePage;