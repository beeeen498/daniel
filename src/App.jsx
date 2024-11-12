import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import FashionStorePage from "./pages/FashionStore/FashionStorePage";
import ArtStorePage from "./pages/ArtStore/ArtStorePage";
import InfoPage from './pages/InfoPage/InfoPage';
import Footer from './components/Footer';
import StoreNav from './components/StoreNav';
import ItemPage from './components/ItemPage';
import ArticlePage from './pages/InfoPage/components/ArticlePage';
import SelectLanguagePage from './components/SelectLanguagePage';
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <Router>
                <MainApp />
            </Router>
        </LanguageProvider>
    );
}

function MainApp() {
    const { language } = useLanguage();
    const location = useLocation();

    useEffect(() => {
        // Scroll to the top when navigating to a new route or hash
        if (!location.hash) {
            window.scrollTo(0, 0);
        } else {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 0);  // Delay to allow the DOM to update
            }
        }
    }, [location]);

    useEffect(() => {
        document.documentElement.dir = language === 'Hebrew' ? 'rtl' : 'ltr';
    }, [language]);

    // Render the SelectLanguagePage if no language is selected
    if (!language) {
        return <SelectLanguagePage />;
    }

    return (
        <>
            <StoreNav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fashion" element={<FashionStorePage />} />
                <Route path="/art" element={<ArtStorePage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="/item/:id" element={<ItemPage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
