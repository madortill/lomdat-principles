import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import garageSVG from "../../assets/Shutter.svg";

import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
import DriveTypesSlide from "../../slides/DriveTypesSlide/DriveTypesSlide";
import RoadSign from "../../slides/RoadSign/RoadSign";
import BillboardCarsSlide from "../../slides/BillboardCarsSlide/BillboardCarsSlide";
import VehicleGameSlide from "../../slides/VehicleIdentifyGameSlide/VehicleIdentifyGameSlide";
import NavbarLearning from "../../components/NavbarLearning/NavbarLearning";

function LearningPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGarage, setShowGarage] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();
  const [maxVisitedSlide, setMaxVisitedSlide] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  // const isLastSlide = currentSlide === slides.length - 1;

  // const nextSlide = () => {
  //     const isLastSlide = currentSlide === slides.length - 1;

  //     if (isLastSlide) {
  //         navigate("/end");
  //         return;
  //     }

  //     setCurrentSlide(prev => prev + 1);
  // };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;

    if (isLastSlide) {
      navigate("/end");
      return;
    }

    const next = currentSlide + 1;

    setCurrentSlide(next);
    setMaxVisitedSlide((prev) => Math.max(prev, next));
  };

  // const prevSlide = () => {
  //     if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  // };

  const prevSlide = () => {
    let prevIndex = currentSlide - 1;

    while (prevIndex >= 0 && slides[prevIndex].type === "question") {
      prevIndex--;
    }

    if (prevIndex >= 0) {
      setCurrentSlide(prevIndex);
    }
  };

  useEffect(() => {
    if (!slides || slides.length === 0) {
      navigate("/end");
    }
  }, []);

  const slide = slides[currentSlide];

  if (!slide) return null;

  // בדיקה אם הגראז' צריך להופיע או להיעלם
  useEffect(() => {
    if (!slide) return;

    if (!firstLoad) {
      setShowGarage(slide.type === "question");
    } else {
      if (slide.type === "question") setShowGarage(true);
      setFirstLoad(false);
    }
  }, [slide]);

  const sectionsLearning1 = [
    { title: "רכב חום", slideIndex: 0 },
    { title: "רכב לבן", slideIndex: 1 },
    { title: "זיהוי רכב צבאי", slideIndex: 2 },
    { title: "סוגי רכבים", slideIndex: 12 },
    { title: "סוגי נסיעות", slideIndex: 16 },
    { title: "הוראות לרכב חום", slideIndex: 20 },
    { title: "הוראות לרכב אישי", slideIndex: 21 },
    { title: "סיכום", slideIndex: 22 },
  ];

  const renderSlide = () => {
    switch (slide.type) {
      case "normal":
        return <NormalSlide data={slide} />;
      case "flipCards":
        return (
          <FlipCardsSlide
            data={slide}
            unlock={() => setCanProceed(true)}
            setIsOverlayOpen={setIsOverlayOpen}
          />
        );
      case "vehicleTypes":
        return (
          <VehicleTypesSlide data={slide} setIsOverlayOpen={setIsOverlayOpen} />
        );
      case "twoOptions":
        return (
          <TwoOptionsSlide
            data={slide}
            unlock={() => setCanProceed(true)}
            setIsOverlayOpen={setIsOverlayOpen}
          />
        );
      case "question":
        return (
          <QuestionSlide
            key={slide.id}
            data={slide}
            onCorrect={nextSlide}
            isLastQuestion={currentSlide === slides.length - 1}
          />
        );
      case "driveTypes":
        return (
          <DriveTypesSlide data={slide} unlock={() => setCanProceed(true)} />
        );
      case "roadSign":
        return <RoadSign data={slide} />;
      case "billBoard":
        return (
          <BillboardCarsSlide data={slide} unlock={() => setCanProceed(true)} />
        );
      case "vehicleGame":
        return (
          <VehicleGameSlide
            data={slide}
            unlock={nextSlide}
            goBack={prevSlide}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (
      slide.type === "flipCards" ||
      slide.type === "twoOptions" ||
      slide.type === "driveTypes" ||
      slide.type === "billBoard"
    ) {
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

      <NavbarLearning
        sectionsLearning1={sectionsLearning1}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        maxVisitedSlide={maxVisitedSlide}
      />

      {(slide.id == "3" || slide.type === "vehicleTypes") && (
        <img src={sign} alt="" className="sign-photo" />
      )}

      {/* רקע הגראז' עם אנימציה לירידה/עלייה */}
      <div
        className={`garage-wrapper ${showGarage ? "slide-down" : "slide-up"}`}
      >
        <img src={garageSVG} className="garage-bg" alt="garage" />
      </div>

      {/* הרכב */}
      {slide.type !== "vehicleGame" && (
        <div className="car-wrapper">
          <img src={carFront} className="car-img" alt="car" />
        </div>
      )}

      {/* סלייד רגיל */}
      {slide.type !== "question" && slide.type !== "vehicleGame" && (
        <div className="slide-wrapper">
          <div className="safe-area">{renderSlide()}</div>
        </div>
      )}

      {/* כפתורי ניווט לסליידים רגילים */}
      {!isOverlayOpen &&
        slide.type !== "question" &&
        slide.type !== "vehicleGame" && (
          <div className="nav-buttons-container">
            <img
              src={nextBtn}
              onClick={canProceed ? nextSlide : null}
              className={`btn-nav ${!canProceed ? "disabled" : ""}`}
            />
            {currentSlide > 0 && slide.type !== "question" && (
              <img src={backBtn} onClick={prevSlide} className="btn-nav" />
            )}
          </div>
        )}

      {/* Overlay לשאלות */}
      {slide.type === "question" && (
        <div className="question-overlay-container">
          {/* <div className="garage-wrapper">
                        <img src={garageSVG} className="garage-bg" alt="garage" />
                    </div> */}
          {renderSlide()}
        </div>
      )}

      {/* שאלות זיהוי רכבים */}
      {slide.type === "vehicleGame" && (
        <div className="vehicle-game-overlay">{renderSlide()}</div>
      )}

      <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
    </div>
  );
}

export default LearningPage;
