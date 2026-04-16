// import { useState, useEffect } from "react";
// import "./CarStopSlide.css";

// import road from "../../assets/road.svg";
// import car from "../../assets/car-on-the-side.svg";

// function CarStopSlide({ data, unlock }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [openedSteps, setOpenedSteps] = useState([]);
//   const [isMoving, setIsMoving] = useState(false);

//   function handleStepClick(index) {
//     if (index !== currentStep || isMoving) return;

//     setIsMoving(true);

//     setTimeout(() => {
//       setOpenedSteps((prev) => [...prev, index]);
//       setCurrentStep((prev) => prev + 1);
//       setIsMoving(false);
//     }, 800);
//   }

//   useEffect(() => {
//     if (currentStep === data.steps.length) {
//       unlock();
//     }
//   }, [currentStep]);

//   return (
//     <div className="car-stop-slide">
//       <div className="slide-title">{data.header}</div>
//       <div className="slide-text">{data.text1}</div>
//       <div className="slide-text secondary">{data.text2}</div>

//       {/* 🎯 אזור כביש עצמאי */}
//       <div className="road-area-2">
//         <img src={road} className="road-img" />

//         {/* 🚗 רכב */}
//         <img src={car} className={`car car-pos-${currentStep}`} />

//         {/* 🚧 שלטים */}
//         {data.steps.map((step, index) => (
//           <div key={index} className={`step-wrapper step-${index}`}>
//             <div
//               className={`
//                 step
//                 ${index === currentStep ? "active" : ""}
//                 ${openedSteps.includes(index) ? "done" : ""}
//               `}
//               onClick={() => handleStepClick(index)}
//             >
//               {index + 1}
//             </div>

//             {/* 🪪 כרטיס */}
//             {openedSteps.includes(index) && (
//               <div className="card-popup">
//                 <img src={step.img} />
//                 <p>{step.text}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CarStopSlide;

// import { useEffect, useRef, useState } from "react";
// import "./CarStopSlide.css";

// import road from "../../assets/road.svg";
// import car from "../../assets/car-on-the-side.svg";

// function CarStopSlide({ data, unlock }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [openedSteps, setOpenedSteps] = useState([]);
//   const trackRef = useRef(null);
//   const [carX, setCarX] = useState(0);

//   const steps = data.steps;

//   useEffect(() => {
//     const update = () => {
//       const track = trackRef.current;
//       if (!track) return;

//       const stepsEls = track.querySelectorAll(".step-wrapper");
//       const target = stepsEls[currentStep];

//       if (!target) return;

//       const trackRect = track.getBoundingClientRect();
//       const stepRect = target.getBoundingClientRect();

//       setCarX(stepRect.left - trackRect.left + stepRect.width / 2);
//     };

//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, [currentStep]);

//   function handleClick(i) {
//     if (i !== currentStep) return;

//     setOpenedSteps((p) => [...p, i]);

//     setTimeout(() => {
//       setCurrentStep((p) => p + 1);
//     }, 500);
//   }

//   useEffect(() => {
//     if (currentStep === steps.length) unlock();
//   }, [currentStep]);

//   return (
//     <div className="car-overlay">
//       <div className="road-track-overlay" ref={trackRef}>
//         {/* 🚗 רכב – יושב על הכביש האמיתי */}
//         <img
//           src={car}
//           className="car-overlay-img"
//           style={{ transform: `translateX(${carX}px)` }}
//         />

//         {steps.map((step, i) => (
//           <div key={i} className="step-wrapper-overlay">
//             <div
//               className={`step ${i === currentStep ? "active" : ""} ${
//                 i < currentStep ? "done" : ""
//               }`}
//               onClick={() => handleClick(i)}
//             >
//               {i + 1}
//             </div>

//             {openedSteps.includes(i) && (
//               <div className="card-popup">
//                 <img src={step.img} />
//                 <p>{step.text}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CarStopSlide;

// import { useEffect, useRef, useState } from "react";
// import "./CarStopSlide.css";

// import car from "../../assets/car-on-the-side.svg";

// function CarStopSlide({ data, unlock }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [openedSteps, setOpenedSteps] = useState([]);
//   const [carX, setCarX] = useState(0);

//   const trackRef = useRef(null);
//   const steps = data.steps;

//   // 🚗 חישוב מיקום רכב
//   useEffect(() => {
//     const update = () => {
//       const track = trackRef.current;
//       if (!track) return;

//       const items = track.querySelectorAll(".step-wrapper");
//       const target = items[currentStep];

//       if (!target) return;

//       const trackRect = track.getBoundingClientRect();
//       const stepRect = target.getBoundingClientRect();

//       const x = stepRect.left - trackRect.left + stepRect.width / 2 - 60; // חצי רוחב רכב

//       setCarX(x);
//     };

//     update();
//     window.addEventListener("resize", update);

//     return () => window.removeEventListener("resize", update);
//   }, [currentStep, steps.length]);

//   // 🔓 סיום
//   useEffect(() => {
//     if (currentStep === steps.length) unlock();
//   }, [currentStep]);

//   function handleClick(i) {
//     if (i !== currentStep) return;

//     setOpenedSteps((p) => [...p, i]);

//     setTimeout(() => {
//       setCurrentStep((p) => p + 1);
//     }, 500);
//   }

//   return (
//     <div className="car-overlay">
//       <div className="road-track-overlay" ref={trackRef}>
//         {/* 🚗 רכב */}
//         <img
//           src={car}
//           className="car-overlay-img"
//           style={{ transform: `translateX(${carX}px)` }}
//         />

//         {/* 🚧 שלטים */}
//         {steps.map((step, i) => {
//           const isActive = i === currentStep;
//           const isDone = i < currentStep;

//           return (
//             <div key={i} className="step-wrapper-overlay">
//               <div
//                 className={`step ${isActive ? "active" : ""} ${
//                   isDone ? "done" : ""
//                 }`}
//                 onClick={() => handleClick(i)}
//               >
//                 {i + 1}
//               </div>

//               {openedSteps.includes(i) && (
//                 <div className="card-popup">
//                   <img src={step.img} />
//                   <p>{step.text}</p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default CarStopSlide;

import { useEffect, useState } from "react";
import "./CarStopSlide.css";
import car from "../../assets/car-on-the-side.svg";

function CarStopSlide({ data, unlock }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [openedSteps, setOpenedSteps] = useState([]);

  const steps = data?.steps ?? [];

// רוחב המסלול (כמו ה-steps-track שלך)
const trackWidth = 80; 
const offset = 10;

// מרחק בין שלטים
const stepWidth = trackWidth / (steps.length - 1 || 1);

// מיקום הרכב (מימין לשמאל)
const carX = offset + (trackWidth - currentStep * stepWidth);

  function handleClick(i) {
    if (i !== currentStep) return;

    setOpenedSteps((p) => [...p, i]);

    setTimeout(() => {
      setCurrentStep((p) => p + 1);
    }, 500);
  }

  useEffect(() => {
    if (!steps.length) return;
    if (currentStep === steps.length) unlock?.();
  }, [currentStep, steps.length]);

  return (
    <div>
      <h2 className="slide-title">{data.header}</h2>
      <div className="vehicle-text">{data.text1}</div>
      <div className="vehicle-text">{data.text2}</div>
      <div className="car-overlay">
        <img
          src={car}
          className="car-overlay-img"
          style={{
            left: `${carX}%`,
          }}
        />

        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;

          return (
            <div key={i} className="step-wrapper-overlay">
              <div
                className={`step ${isActive ? "active" : ""} ${
                  isDone ? "done" : ""
                }`}
                onClick={() => handleClick(i)}
              >
                {i + 1}
              </div>

              {openedSteps.includes(i) && (
                <div className="card-popup">
                  <img src={step.img} />
                  <div>{step.text}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarStopSlide;
