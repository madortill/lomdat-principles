import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import slides from "../../data/slides-chapter2.json";
import "./LearningPage2.css";

// Assets
import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import logo from "../../assets/logo.png";
import nextBtn from "../../assets/next-btn-2.svg";
import backBtn from "../../assets/back-btn-2.svg";
import chapterBackBtn from "../../assets/chapter-back-btn.svg";
import garageSVG from "../../assets/Shutter.svg";
import road from "../../assets/road.svg";
import tillBlackLogo from "../../assets/till_blacklogo.svg";
import bushLeft from "../../assets/bush-left.svg";
import bushRight from "../../assets/bush-right.svg";

// Slides & Components
import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
import CarStopSlide from "../../slides/CarStopSlide/CarStopSlide";
import Tabs from "../../slides/Tabs/Tabs";
import Popup from "../../components/Popup/Popup.jsx";
import DriveSimulationSlide from "../../slides/DriveSimulationSlide/DriveSimulationSlide";
import AfterStopSimulation from "../../slides/AfterStopSimulation/AfterStopSimulation";
import TwoRoadSigns from "../../slides/TwoRoadSigns/TwoRoadSigns";
import OptionsSignsSlide from "../../slides/OptionsSignsSlide/OptionsSignsSlide";
import NavbarLearning from "../../components/NavbarLearning/NavbarLearning";
import ConfettiSlide from "../../components/ConfettiSlide/ConfettiSlide";

function LearningPage2({ progress, setProgress, ch1Max }) {
  const navigate = useNavigate();

  // שימוש בנתונים מה-App
  const { currentSlide, maxVisited, completed } = progress;

  const [showGarage, setShowGarage] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [canProceed, setCanProceed] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const slide = slides[currentSlide];
  const prevSlideData = slides[currentSlide - 1] || slide;

  // פונקציות עדכון גלובליות
  const updateProgress = (newData) => {
    setProgress((prev) => ({ ...prev, ...newData }));
  };

  const markSlideAsComplete = (slideId) => {
    updateProgress({
      completed: { ...completed, [slideId]: true },
    });
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/end");
      return;
    }
    const next = currentSlide + 1;
    updateProgress({
      currentSlide: next,
      maxVisited: Math.max(maxVisited, next),
    });
  };

  const prevSlideHandler = () => {
    let prevIndex = currentSlide - 1;
    const skipTypes = ["question", "popup"];
    while (prevIndex >= 0 && skipTypes.includes(slides[prevIndex].type)) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      updateProgress({ currentSlide: prevIndex });
    }
  };

  // פונקציות עזר לפופאפים וניווט
  const closePopupAndMoveOn = () => {
    markSlideAsComplete(slide.id);
    nextSlide();
  };

  const setCurrentSlideFromNav = (index) => {
    updateProgress({ currentSlide: index });
  };

  // ניהול נעילת כפתור "הבא"
  useEffect(() => {
    if (completed[slide.id]) {
      setCanProceed(true);
      return;
    }

    const interactionTypes = [
      "driveTypes",
      "carStop",
      "tabs",
      "driveSimulation",
      "afterStopCarSimulation",
      "optionsSignsSlide",
    ];

    setCanProceed(!interactionTypes.includes(slide.type));
  }, [slide, completed]);

  // שליטה באנימציית הגראז'
  useEffect(() => {
    if (!slide) return;
    if (!firstLoad) {
      setShowGarage(slide.type === "question");
    } else {
      if (slide.type === "question") setShowGarage(true);
      setFirstLoad(false);
    }
  }, [slide]);

  // הגדרת הסקשנים הספציפיים לפרק 2
  const sectionsLearning2 = [
    { title: "הכללים לעצירת כלי רכב", slideIndex: 0 },
    { title: "אופן העצירה במצב סטטי", slideIndex: 3 },
    { title: "אופן העצירה במצב נסיעה", slideIndex: 6 },
    { title: "פעולות השוטר הצבאי לאחר עצירת הרכב", slideIndex: 7 },
    { title: "שימוש בסירנה", slideIndex: 9 },
    { title: "עצירת כלי רכב והכוונות תנועה", slideIndex: 12 },
  ];

  const renderSlide = (customSlide = slide) => {
    switch (customSlide.type) {
      case "normal":
        return <NormalSlide data={customSlide} />;
      case "question":
        return (
          <QuestionSlide
            key={slide.id}
            data={slide}
            onCorrect={() => {
              markSlideAsComplete(slide.id); // 1. סימון השאלה כהושלמה בסטייט הכללי
              nextSlide(); // 2. מעבר לסלייד הבא
            }}
            isLastQuestion={currentSlide === slides.length - 1}
            wasCompleted={!!completed[slide.id]} // 3. בדיקה אם השאלה כבר נפתרה בעבר
          />
        );
      case "carStop":
        return (
          <CarStopSlide
            data={customSlide}
            unlock={() => {
              setCanProceed(true);
              markSlideAsComplete(customSlide.id);
            }}
            wasCompleted={!!completed[customSlide.id]}
          />
        );
      case "tabs":
        return (
          <Tabs
            data={customSlide}
            unlock={() => {
              setCanProceed(true);
              markSlideAsComplete(customSlide.id);
            }}
            wasCompleted={!!completed[customSlide.id]}
          />
        );
      case "driveSimulation":
        return (
          <DriveSimulationSlide
            data={customSlide}
            unlock={(action) => {
              if (action === "back") prevSlideHandler();
              else if (action === "finish") nextSlide();
              else setCanProceed(true);
            }}
          />
        );
      case "afterStopCarSimulation":
        return (
          <AfterStopSimulation
            data={customSlide}
            unlock={(action) => {
              if (action === "back") prevSlideHandler();
              else nextSlide();
            }}
          />
        );
      case "twoRoadSigns":
        return <TwoRoadSigns data={customSlide} />;
      case "optionsSignsSlide":
        return (
          <OptionsSignsSlide
            data={customSlide}
            unlock={() => {
              setCanProceed(true);
              markSlideAsComplete(customSlide.id);
            }}
            wasCompleted={!!completed[customSlide.id]}
          />
        );
      case "confetti":
        return <ConfettiSlide data={customSlide} onComplete={nextSlide} />;
      default:
        return null;
    }
  };

  if (!slide) return null;

  return (
    <div className="learning-page2">
      {/* כפתור חזרה מהיר שמופיע רק בסלייד הראשון */}
      {/* {currentSlide === 0 && (
        <button
          className="quick-back-btn"
          onClick={() => navigate("/learning")}
        >
          חזור לפרק הקודם
        </button>
      )} */}

      {/* קרקע + כביש */}
      {slide.type !== "driveSimulation" &&
        slide.type !== "afterStopCarSimulation" && (
          <div className="ground-area">
            <div className="road-wrapper-2">
              <img src={road} className="road-opening-page" alt="" />
              <img src={bushLeft} className="bush-left-2" alt="" />
              <img src={bushRight} className="bush-right-2" alt="" />
            </div>
          </div>
        )}

      {/* UI Elements */}
      <img src={logo} className="logo-bahad13-learning-pages" alt="logo" />
      <img
        src={tillBlackLogo}
        className="till-logo-black-end-page"
        alt="till"
      />

      {slide.type !== "driveSimulation" && (
        <div className="clouds-container">
          <img src={BigCloud} className="big-cloud-learning-page-left" alt="" />
          <img
            src={BigCloud}
            className="big-cloud-learning-page-right"
            alt=""
          />
          <img
            src={SmallCloud}
            className="small-cloud-opening-page-left"
            alt=""
          />
          <img
            src={SmallCloud}
            className="small-cloud-opening-page-right"
            alt=""
          />
        </div>
      )}

      <NavbarLearning
        key={currentSlide}
        title="אופן עצירת רכבים והכוונות תנועה"
        sections={sectionsLearning2}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlideFromNav}
        maxVisitedSlide={maxVisited}
        onBackToPrevChapter={() => navigate("/learning")}
      />

      <div
        className={`garage-wrapper ${showGarage ? "slide-down" : "slide-up"}`}
      >
        <img src={garageSVG} className="garage-bg" alt="" />
      </div>

      {/* רינדור תוכן הסלייד */}
      {slide.type === "question" ? (
        <div className="question-overlay-container">{renderSlide()}</div>
      ) : slide.type === "popup" ? (
        <>
          <div>{renderSlide(prevSlideData)}</div>
          <Popup
            data={slide}
            onClose={closePopupAndMoveOn}
            wasCompleted={!!completed[slide.id]}
          />
        </>
      ) : (
        <div className="content-container">{renderSlide()}</div>
      )}

      {/* כפתורי ניווט */}
      {!isOverlayOpen &&
        ![
          "question",
          "popup",
          "driveSimulation",
          "afterStopCarSimulation",
          "confetti",
        ].includes(slide.type) && (
          <div className="nav-buttons-2-container">
            <img
              src={nextBtn}
              className={`btn-nav ${!canProceed ? "disabled" : ""}`}
              onClick={canProceed ? nextSlide : null}
              alt="Next"
            />
            {currentSlide > 0 && (
              <img
                src={backBtn}
                onClick={prevSlideHandler}
                className="btn-nav"
                alt="Back"
              />
            )}
            {currentSlide === 0 && (
              <img
                src={chapterBackBtn}
                onClick={() => navigate("/learning")}
                className="btn-nav"
                alt="Back"
              />
            )}
          </div>
        )}
    </div>
  );
}

export default LearningPage2;
