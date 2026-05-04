// import { useState } from "react";
// import "./AfterStopSimulation.css";

// import car from "../../assets/car-side-i20-blue.svg";
// import road from "../../assets/road-shul-right-side.svg";
// import policeCar from "../../assets/police-car-side-right.svg";
// import officer1 from "../../assets/officer-walk.svg";
// import officer2 from "../../assets/officer-write.svg";

// import BigCloud from "../../assets/cloud-big.svg";
// import SmallCloud from "../../assets/cloud-small.svg";

// import nextBtn from "../../assets/next-btn-2.svg";
// import backBtn from "../../assets/back-btn-2.svg";

// function AfterStopCarSimulation({ data, unlock }) {
//   const [stage, setStage] = useState(0);

//   const STAGES = {
//     INTRO: 0,
//     WALK_HALF: 1,
//     STOP_HALF: 2,
//     WALK_TO_CAR: 3,
//     AT_CAR: 4,
//     WALK_BACK: 5,
//     AT_POLICE: 6,
//     FINAL_TEXT: 7,
//   };

//   const handleNext = () => {
//     if (stage < STAGES.FINAL_TEXT) {
//       setStage(stage + 1);
//     } else {
//       unlock?.();
//     }
//   };

//   const handleBack = () => {
//     if (stage === STAGES.INTRO) {
//       unlock?.("back");
//       return;
//     }
//     setStage((prev) => prev - 1);
//   };

//   return (
//     <div className={`afterStopSim stage-${stage}`}>
//       <h2 className="slide-title2">{data.header}</h2>

//       <img src={BigCloud} className="big-cloud-learning-page-left" />
//       <img src={BigCloud} className="big-cloud-learning-page-right" />
//       <img src={SmallCloud} className="small-cloud-opening-page-left" />
//       <img src={SmallCloud} className="small-cloud-opening-page-right" />

//       {/* כביש */}
//       {/* <div className="afterStopSim__road"></div> */}
//       <img src={road} className="afterStopSim__road" />

//       {/* רכבים */}
//       <div className="afterStopSim_car-container">
//         <img
//           src={car}
//           className="afterStopSim__car afterStopSim__car--front"
//           alt=""
//         />
//         <img
//           src={policeCar}
//           className="afterStopSim__car afterStopSim__car--police"
//           alt=""
//         />
//       </div>

//       {/* שוטר */}
//       <img
//         src={stage >= STAGES.AT_POLICE ? officer2 : officer1}
//         className="afterStopSim__officer"
//         alt=""
//       />

//       {/* טקסטים */}
//       {stage === STAGES.INTRO && (
//         <div className="afterStopSim__text">{data.introText}</div>
//       )}

//       {stage === STAGES.STOP_HALF && (
//         <div
//           className="afterStopSim__text"
//           dangerouslySetInnerHTML={{ __html: data.stop1 }}
//         />
//       )}

//       {stage === STAGES.AT_CAR && (
//         <div
//           className="afterStopSim__text"
//           dangerouslySetInnerHTML={{ __html: data.stop2 }}
//         />
//       )}

//       {stage === STAGES.AT_POLICE && (
//         <div
//           className="afterStopSim__text"
//           dangerouslySetInnerHTML={{ __html: data.stop3 }}
//         />
//       )}

//       {stage === STAGES.FINAL_TEXT && (
//         <div
//           className="afterStopSim__text"
//           dangerouslySetInnerHTML={{ __html: data.stop4 }}
//         />
//       )}

//       {/* כפתורים */}
//       <div className="nav-buttons-2-container">
//         <img src={nextBtn} className="btn-nav" onClick={handleNext} />
//         <img src={backBtn} className="btn-nav" onClick={handleBack} />
//       </div>
//     </div>
//   );
// }

// export default AfterStopCarSimulation;

import { useState, useEffect } from "react";
import "./AfterStopSimulation.css";

import car from "../../assets/car-side-i20-blue.svg";
import road from "../../assets/road-shul-right-side.svg";
import policeCar from "../../assets/police-car-side-right.svg";
import officerWalk from "../../assets/officer-walk.svg";
import officerWalkBack from "../../assets/officer-walk-back.svg";
import officerWrite from "../../assets/officer-write.svg";

import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";

import nextBtn from "../../assets/next-btn-2.svg";
import backBtn from "../../assets/back-btn-2.svg";

function AfterStopCarSimulation({ data, unlock }) {
  const [stage, setStage] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  const [canClickNext, setCanClickNext] = useState(true);

  const STAGES = {
    INTRO: 0,
    WALK_HALF: 1,
    WALK_TO_CAR: 2,
    WALK_BACK: 3,
    FINAL_TEXT: 4,
  };

  useEffect(() => {
    if (stage === STAGES.WALK_BACK) {
      setIsWriting(false);

      const timer = setTimeout(() => {
        setIsWriting(true);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      setIsWriting(false);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === STAGES.INTRO) {
      setCanClickNext(true); // בפתיחה מאופשר
      return;
    }

    setCanClickNext(false);

    const timer = setTimeout(() => {
      setCanClickNext(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [stage]);

  const getOfficerImage = () => {
    if (stage === STAGES.WALK_BACK && !isWriting) {
      return officerWalkBack; // 👈 הולך אחורה
    }

    if (isWriting || stage === STAGES.FINAL_TEXT) {
      return officerWrite; // 👈 כותב
    }

    return officerWalk; // 👈 רגיל
  };

  const handleNext = () => {
    if (stage < STAGES.FINAL_TEXT) {
      setStage(stage + 1);
    } else {
      unlock?.("finish");
    }
  };

  const handleBack = () => {
    if (stage === STAGES.INTRO) {
      unlock?.("back");
      return;
    }
    setStage((prev) => prev - 1);
  };

  return (
    <div className={`afterStopSim stage-${stage}`}>
      <div
        className="afterStopSim__title"
        dangerouslySetInnerHTML={{ __html: data.header }}
      ></div>

      <img src={BigCloud} className="big-cloud-learning-page-left" />
      <img src={BigCloud} className="big-cloud-learning-page-right" />
      <img src={SmallCloud} className="small-cloud-opening-page-left" />
      <img src={SmallCloud} className="small-cloud-opening-page-right" />

      {/* כביש */}
      {/* <div className="afterStopSim__road"></div> */}
      <img src={road} className="afterStopSim__road" />

      {/* רכבים */}
      <div className="afterStopSim_car-container">
        <img
          src={car}
          className="afterStopSim__car afterStopSim__car--front"
          alt=""
        />
        <img
          src={policeCar}
          className="afterStopSim__car afterStopSim__car--police"
          alt=""
        />
      </div>

      {/* שוטר */}
      <img
        src={getOfficerImage()}
        className={`afterStopSim__officer 
        ${
          isWriting || stage === STAGES.FINAL_TEXT
            ? "afterStopSim__officer--writing"
            : ""
        }`}
        alt=""
      />

      {/* טקסטים */}
      {stage === STAGES.INTRO && (
        <div className="afterStopSim__text">{data.introText}</div>
      )}

      {stage === STAGES.WALK_HALF && (
        <div
          className="text-box-2-after-stop text-box-2-stop-1"
          dangerouslySetInnerHTML={{ __html: data.stop1 }}
        />
      )}

      {stage === STAGES.WALK_TO_CAR && (
        <div
          className="text-box-2-after-stop text-box-2-stop-2"
          dangerouslySetInnerHTML={{ __html: data.stop2 }}
        />
      )}

      {stage === STAGES.WALK_BACK && (
        <div
          className="text-box-2-after-stop text-box-2-stop-3"
          dangerouslySetInnerHTML={{ __html: data.stop3 }}
        />
      )}

      {stage === STAGES.FINAL_TEXT && (
        <div
          className="text-box-2-after-stop text-box-2-stop-4"
          dangerouslySetInnerHTML={{ __html: data.stop4 }}
        />
      )}

      {/* כפתורים */}
      <div className="nav-buttons-2-container">
        <img
          src={nextBtn}
          className={`btn-nav ${!canClickNext ? "disabled" : ""}`}
          onClick={canClickNext ? handleNext : null}
        />
        <img src={backBtn} className="btn-nav" onClick={handleBack} />
      </div>
    </div>
  );
}

export default AfterStopCarSimulation;
