import { useEffect, useState } from "react";
import "./CarStopSlide.css";
import car from "../../assets/car-on-the-side.svg";

function CarStopSlide({ data, unlock, wasCompleted }) {
  const steps = data?.steps ?? [];

  // איתחול הצעד והכרטיסים
  const [currentStep, setCurrentStep] = useState(
    wasCompleted ? steps.length : 0
  );
  const [openedSteps, setOpenedSteps] = useState(
    wasCompleted ? steps.map((_, i) => i) : []
  );

  // חדש: משתנה שעוזר לנו לדעת אם אנחנו "רק נכנסנו" לסלייד
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // שליטה על מיקום הרכב (אחוזים)
  const carPositions = [
    90, //מיקום התחלתי של הרכב
    78, // שלט 1 (ימין)
    59,
    40,
    20, // השלט הכי שמאלי (4)
  ];

  // אם סיימנו, המיקום יהיה האחרון ברשימה
  const carX =
    carPositions[currentStep] ?? carPositions[carPositions.length - 1];

  function handleClick(i) {
    if (i !== currentStep) return;

    // ברגע שיש לחיצה, אנחנו כבר לא בטעינה ראשונית, האנימציה צריכה לעבוד
    setIsInitialLoad(false);
    setCurrentStep((p) => p + 1);

    setTimeout(() => {
      setOpenedSteps((p) => [...p, i]);
    }, 400);
  }

  useEffect(() => {
    if (!steps.length) return;
    if (currentStep === steps.length && !wasCompleted) {
      unlock?.();
    }
  }, [currentStep, steps.length, wasCompleted]);

  // אפקט קטן כדי "לשחרר" את מצב הטעינה אחרי שנייה,
  // כדי שאם המשתמש חוזר אחורה וקדימה זה יתאפס נכון
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 100);
    return () => clearTimeout(timer);
  }, []);

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
            /* השינוי כאן: האנימציה תבוטל רק אם אנחנו בטעינה ראשונה 
                 וגם השאלה כבר הושלמה בעבר. 
                 ברגע שמתחילים ללחוץ, isInitialLoad הופך ל-false והאנימציה חוזרת.
              */
            transition:
              isInitialLoad && wasCompleted ? "none" : "left 0.6s ease-out",
          }}
        />

        {steps.map((step, i) => {
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
