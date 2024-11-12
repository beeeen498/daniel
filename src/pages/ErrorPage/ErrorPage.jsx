import react from "react";
import "./styles/ErrorPage.css";

function ErrorPage(){
    return(
        <div className="errorPage">
            <h1>Oh no! We couldn't find that page...</h1>
            <p className="errorPageSubText">
                click <a href="/">here</a> to Head back to the homepage.
            </p>
        </div>
    )
}

export default ErrorPage;