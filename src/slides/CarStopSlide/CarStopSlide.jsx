import { useEffect, useState } from "react";
import "./CarStopSlide.css";
import car from "../../assets/car-on-the-side.svg";

function CarStopSlide({ data, unlock }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [openedSteps, setOpenedSteps] = useState([]);

  const steps = data?.steps ?? [];

  // שליטה על מיקום הרכב (אחוזים)
  const carPositions = [
    90, //מיקום התחלתי של הרכב
    78, // שלט 1 (ימין)
    59,
    40,
    20, // השלט הכי שמאלי (4)
  ];

  const carX =
    carPositions[currentStep] ?? carPositions[carPositions.length - 1];

  function handleClick(i) {
    if (i !== currentStep) return;

    setCurrentStep((p) => p + 1);

    setTimeout(() => {
      setOpenedSteps((p) => [...p, i]);
    }, 400);
  }

  useEffect(() => {
    if (!steps.length) return;
    if (currentStep === steps.length) unlock?.();
  }, [currentStep, steps.length]);

  return (
    <div>
      <div className="learning-content-2">
        <h2 className="slide-title2">{data.header}</h2>
        <div className="slide-text2">{data.text1}</div>
        <div className="slide-text2 special-text">{data.text2}</div>
      </div>

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
