import { useState } from "react";
import slides from "../../data/slides.json";
import "./LearningPage.css";
import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import logo from "../../assets/logo.png";
import tillWhiteLogo from "../../assets/till_whitelogo.svg";
import carFront from "../../assets/car-front.svg";
import nextBtn from "../../assets/next-btn.svg";
import backBtn from "../../assets/back-btn.svg";
import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
// import BillboardCarsSlide from "../../slides/BillboardCarsSlide/BillboardCarsSlide";

function LearningPage() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const renderSlide = () => {
        const slide = slides[currentSlide];

        switch (slide.type) {

            case "normal":
                return <NormalSlide data={slide} />

            case "flipCards":
                return <FlipCardsSlide data={slide} />

            case "vehicleTypes":
                return <VehicleTypesSlide data={slide} />

            case "twoOptions":
                return <TwoOptionsSlide data={slide} />

            case "billboardCars":
                return <BillboardCarsSlide data={slide} />

            default:
                return null
        }
    };

    return (
        <div className="learning-page">
            <img src={logo} className="logo-bahad13-learning-pages" />
            <img src={BigCloud} className="big-cloud-learning-page-left" />
            <img src={BigCloud} className="big-cloud-learning-page-right" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />

            <div className="car-wrapper">
                <img src={carFront} className="car-img" alt="car" />

                <div className="safe-area">

                    {renderSlide()}

                    <div className="nav-buttons-container">
                        <img src={backBtn} onClick={prevSlide} className="btn-nav" />
                        <img src={nextBtn} onClick={nextSlide} className="btn-nav" />
                    </div>

                </div>
            </div>

            <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
        </div>
    );
}

export default LearningPage;