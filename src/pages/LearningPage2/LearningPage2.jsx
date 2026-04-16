import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slides from "../../data/slides-chapter2.json";
import "./LearningPage2.css";

import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import logo from "../../assets/logo.png";
import nextBtn from "../../assets/next-btn-2.svg";
import backBtn from "../../assets/back-btn-2.svg";
import garageSVG from "../../assets/Shutter.svg";

import road from "../../assets/road.svg";
import car from "../../assets/car-on-the-side.svg";
import tillBlackLogo from "../../assets/till_blacklogo.svg";
import bushLeft from "../../assets/bush-left.svg";
import bushRight from "../../assets/bush-right.svg";

import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
import CarStopSlide from "../../slides/CarStopSlide/CarStopSlide";
import NavbarLearning from "../../components/NavbarLearning/NavbarLearning";

function LearningPage2() {
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
      case "question":
        return (
          <QuestionSlide
            key={slide.id}
            data={slide}
            onCorrect={nextSlide}
            isLastQuestion={currentSlide === slides.length - 1}
          />
        );
      case "carStop":
        return <CarStopSlide data={slide} unlock={() => setCanProceed(true)} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (slide.type === "driveTypes" || slide.type === "carStop") {
      setCanProceed(false);
    } else {
      setCanProceed(true);
    }
  }, [slide]);

  return (
    <div className="learning-page2">
      <div className="ground-area">
        <div className="road-wrapper-2">
          <img src={road} className="road-opening-page" />

          {/* <CarStopSlide data={slide} unlock={setCanProceed} /> */}
        </div>

        <img src={bushLeft} className="bush-left-open" />
        <img src={bushRight} className="bush-right-open" />

        {/* <img src={car} className={`car-opening-page`} /> */}
      </div>

      {/* עננים ולוגו */}
      <img src={logo} className="logo-bahad13-learning-pages" />
      <img src={BigCloud} className="big-cloud-learning-page-left" />
      <img src={BigCloud} className="big-cloud-learning-page-right" />
      <img src={SmallCloud} className="small-cloud-opening-page-left" />
      <img src={SmallCloud} className="small-cloud-opening-page-right" />
      <img
        src={tillBlackLogo}
        alt="till logo"
        className="till-logo-black-end-page"
      />

      <NavbarLearning
        sectionsLearning1={sectionsLearning1}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        maxVisitedSlide={maxVisitedSlide}
      />

      {/* רקע הגראז' עם אנימציה לירידה/עלייה */}
      <div
        className={`garage-wrapper ${showGarage ? "slide-down" : "slide-up"}`}
      >
        <img src={garageSVG} className="garage-bg" alt="garage" />
      </div>

      {/* סלייד רגיל */}
      {slide.type !== "question" && (
        // <div className="slide-wrapper-2">
        <div className="">{renderSlide()}</div>
        // </div>
      )}

      {/* כפתורי ניווט לסליידים רגילים */}
      {!isOverlayOpen && slide.type !== "question" && (
        <div className="nav-buttons-2-container">
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
    </div>
  );
}

export default LearningPage2;
