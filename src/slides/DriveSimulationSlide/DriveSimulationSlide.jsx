import { useState, useEffect } from "react";
import "./DriveSimulationSlide.css";
import Popup from "../../components/Popup/Popup";

import car from "../../assets/car-stop-while-driving.svg";
import police from "../../assets/police-car-sirens.svg";
import nextBtn from "../../assets/next-btn-2.svg";
import backBtn from "../../assets/back-btn-2.svg";

function DriveSimulationSlide({ data, unlock }) {
  const [stage, setStage] = useState(0);
  const [canClickNext, setCanClickNext] = useState(true);

  const STAGES = {
    INTRO: 0,
    DRIVE: 1, // שלב הנסיעה
    POPUP1: 2,
    SIDE: 3, // שלב השוליים
    POPUP2: 4,
    END: 5,
  };

  const handleNext = () => {
    if (stage === STAGES.INTRO) setStage(STAGES.DRIVE);
    else if (stage === STAGES.DRIVE) setStage(STAGES.POPUP1);
    else if (stage === STAGES.SIDE) setStage(STAGES.POPUP2);
    else if (stage === STAGES.END) unlock?.();
  };

  const handleBack = () => {
    switch (stage) {
      case STAGES.INTRO:
        unlock?.("back"); // יציאה מהסלייד
        break;
      case STAGES.DRIVE:
        setStage(STAGES.INTRO); // חוזרים ל-INTRO
        break;
      case STAGES.POPUP1:
        setStage(STAGES.DRIVE); // מדלגים על הפופאפ וחוזרים ל-DRIVE
        break;
      case STAGES.SIDE:
        setStage(STAGES.DRIVE); // מ-SIDE חוזרים ישר ל-DRIVE (מדלגים על הפופאפ באמצע)
        break;
      case STAGES.POPUP2:
        setStage(STAGES.SIDE); // מדלגים על פופאפ 2 וחוזרים ל-SIDE
        break;
      case STAGES.END:
        setStage(STAGES.SIDE); // מ-END חוזרים ל-SIDE
        break;
      default:
        setStage(STAGES.INTRO);
        break;
    }
  };

  useEffect(() => {
    if (stage === STAGES.INTRO) {
      setCanClickNext(true);
      return;
    }

    setCanClickNext(false);

    const timer = setTimeout(() => {
      setCanClickNext(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <div className={`drive-slide-2 stage-${stage}`}>
      <h2 className="drive-title-2 drive-title">{data.header}</h2>

      {/* הכביש נשאר בדיוק כפי שהיה */}
      <div className="drive-road-2">
        <div className="road-lines"></div>
      </div>

      {/* הרכבים משתמשים בשמות הקלאסים המקוריים שלך */}
      <img src={car} className={`car-2 normal stage-${stage}`} alt="Car" />
      <img
        src={police}
        className={`car-2 police stage-${stage}`}
        alt="Police"
      />

      <div className={`siren-container stage-${stage}`}>
        <div className="siren-light"></div>
      </div>

      {/* טקסטים */}
      {stage === STAGES.INTRO && (
        <div className="slide-text2-drive">{data.introText}</div>
      )}
      {stage === STAGES.DRIVE && (
        <div className="text-box-2 text-box-2-1">{data.afterStopText}</div>
      )}
      {stage === STAGES.SIDE && (
        <div
          className="text-box-2 text-box-2-2"
          dangerouslySetInnerHTML={{ __html: data.afterSideText }}
        ></div>
      )}

      {/* פופאפים */}
      {/* {stage === STAGES.POPUP1 && (
        <Popup data={data.popup1} onClose={() => setStage(STAGES.SIDE)} />
      )}
      {stage === STAGES.POPUP2 && (
        <Popup data={data.popup2} onClose={() => setStage(STAGES.END)} />
      )} */}

      {/* פופאפים */}
      {stage === STAGES.POPUP1 && (
        <Popup data={data.popup1} onClose={() => setStage(STAGES.SIDE)} />
      )}

      {/* כאן השינוי - אנחנו קוראים ל-unlock עם "finish" */}
      {stage === STAGES.POPUP2 && (
        <Popup data={data.popup2} onClose={() => unlock?.("finish")} />
      )}

      {/* כפתורים */}
      <div className="nav-buttons-2-container">
        {(stage === STAGES.INTRO ||
          stage === STAGES.DRIVE ||
          stage === STAGES.SIDE ||
          stage === STAGES.END) && (
          <img
            src={nextBtn}
            className={`btn-nav ${!canClickNext ? "disabled" : ""}`}
            onClick={canClickNext ? handleNext : null}
          />
        )}
        <img src={backBtn} className="btn-nav" onClick={handleBack} />
      </div>
    </div>
  );
}

export default DriveSimulationSlide;
