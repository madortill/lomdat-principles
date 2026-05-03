import { useEffect, useState } from "react";
import "./CarStopSlide.css";
import car from "../../assets/car-on-the-side.svg";

function CarStopSlide({ data, unlock, wasCompleted }) {
  // const [currentStep, setCurrentStep] = useState(0);
  // const [openedSteps, setOpenedSteps] = useState([]);

  const steps = data?.steps ?? [];

  // 2. איתחול הצעד הנוכחי: אם הושלם, אנחנו בצעד האחרון (אורך המערך)
  const [currentStep, setCurrentStep] = useState(
    wasCompleted ? steps.length : 0
  );

  // 3. איתחול הכרטיסים הפתוחים: אם הושלם, כולם פתוחים
  const [openedSteps, setOpenedSteps] = useState(
    wasCompleted ? steps.map((_, i) => i) : []
  );

  // שליטה על מיקום הרכב (אחוזים)
  const carPositions = [
    90, //מיקום התחלתי של הרכב
    78, // שלט 1 (ימין)
    59,
    40,
    20, // השלט הכי שמאלי (4)
  ];

  // אם סיימנו, המיקום יהיה האחרון ברשימה
  const carX = carPositions[currentStep] ?? carPositions[carPositions.length - 1];

  function handleClick(i) {
    if (i !== currentStep) return;

    setCurrentStep((p) => p + 1);

    setTimeout(() => {
      setOpenedSteps((p) => [...p, i]);
    }, 400);
  }

  useEffect(() => {
    if (!steps.length) return;
    // רק אם זו הפעם הראשונה שמסיימים (לא היה completed לפני)
    if (currentStep === steps.length && !wasCompleted) {
      unlock?.();
    }
  }, [currentStep, steps.length, wasCompleted]);

  return (
    <div>
      <div className="learning-content-2">
        <h2 className="slide-title2">{data.header}</h2>
        <div className="slide-text2">{data.text1}</div>
        <div
          className="slide-text2 special-text"
          dangerouslySetInnerHTML={{ __html: data.text2 }}
        />
      </div>

      <div className="car-overlay">
        <img
          src={car}
          className="car-overlay-img"
          style={{
            left: `${carX}%`,
            transition: wasCompleted ? "none" : "left 0.6s ease-out" // ביטול אנימציה בכניסה חוזרת
          }}
        />

        {steps.map((step, i) => {
          // אם סיימנו בעבר, כולם נחשבים done
          const isActive = i === currentStep;
          const isDone = wasCompleted || i < currentStep;

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
                  <img src={step.img} alt="" />
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
