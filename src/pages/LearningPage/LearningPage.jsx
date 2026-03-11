import { useState, useEffect } from "react";
import slides from "../../data/slides.json";
import "./LearningPage.css";

import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import logo from "../../assets/logo.png";
import tillWhiteLogo from "../../assets/till_whitelogo.svg";
import carFront from "../../assets/car-front.svg";
import nextBtn from "../../assets/next-btn.svg";
import backBtn from "../../assets/back-btn.svg";
import sign from "../../assets/sign-photos.svg";

import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
import garageSVG from "../../assets/Shutter.svg";

function LearningPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showGarage, setShowGarage] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [canProceed, setCanProceed] = useState(false);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const slide = slides[currentSlide];

    // בדיקה אם הגראז' צריך להופיע או להיעלם
    useEffect(() => {
        if (!firstLoad) {
            if (slide.type === "question") setShowGarage(true);
            else setShowGarage(false);
        } else {
            // בעמוד הראשון – אם זה שאלה, הגראז' יורד, אחרת נשאר מוסתר
            if (slide.type === "question") setShowGarage(true);
            setFirstLoad(false);
        }
    }, [slide]);

    const renderSlide = () => {
        switch (slide.type) {
            case "normal":
                return <NormalSlide data={slide} />;
            case "flipCards":
                return <FlipCardsSlide data={slide} unlock={() => setCanProceed(true)} />;
            case "vehicleTypes":
                return <VehicleTypesSlide data={slide} />;
            case "twoOptions":
                return <TwoOptionsSlide data={slide} unlock={() => setCanProceed(true)} />;
            case "question":
                return (
                    <QuestionSlide
                        key={slide.id} // מבטיח איפוס state
                        data={slide}
                        onCorrect={nextSlide}
                        isLastQuestion={currentSlide === slides.length - 1}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {

        if (slide.type === "flipCards" || slide.type === "twoOptions") {
            setCanProceed(false);
        } else {
            setCanProceed(true);
        }

    }, [slide]);

    return (
        <div className="learning-page">
            {/* עננים ולוגו */}
            <img src={logo} className="logo-bahad13-learning-pages" />
            <img src={BigCloud} className="big-cloud-learning-page-left" />
            <img src={BigCloud} className="big-cloud-learning-page-right" />
            <img src={SmallCloud} className="small-cloud-opening-page-left" />
            <img src={SmallCloud} className="small-cloud-opening-page-right" />

            {(slide.type === "flipCards" || slide.type === "vehicleTypes") && (
                <img src={sign} alt="" className="sign-photo" />
            )}

            {/* רקע הגראז' עם אנימציה לירידה/עלייה */}
            <div className={`garage-wrapper ${showGarage ? "slide-down" : "slide-up"}`}>
                <img src={garageSVG} className="garage-bg" alt="garage" />
            </div>

            {/* הרכב */}
            <div className="car-wrapper">
                <img src={carFront} className="car-img" alt="car" />
            </div>

            {/* סלייד רגיל */}
            {slide.type !== "question" && (
                <div className="slide-wrapper">
                    <div className="safe-area">
                        {renderSlide()}
                    </div>
                </div>
            )}

            {/* כפתורי ניווט לסליידים רגילים */}
            {slide.type !== "question" && (
                <div className="nav-buttons-container">
                    <img
                        src={nextBtn}
                        onClick={canProceed ? nextSlide : null}
                        className={`btn-nav ${!canProceed ? "disabled" : ""}`}
                    />
                    {(currentSlide > 0 && slide.type !== "question") && (
                        <img
                            src={backBtn}
                            onClick={prevSlide}
                            className="btn-nav"
                        />
                    )}
                </div>
            )}

            {/* Overlay לשאלות */}
            {slide.type === "question" && (
                <div className="question-overlay-container">
                    <div className="garage-wrapper">
                        <img src={garageSVG} className="garage-bg" alt="garage" />
                    </div>
                    {renderSlide()}
                </div>
            )}

            <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
        </div>
    );
}

export default LearningPage;