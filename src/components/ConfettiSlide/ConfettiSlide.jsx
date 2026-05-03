import React, { useEffect } from "react";
import "./ConfettiSlide.css";

function ConfettiSlide({ data, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, data.duration || 2000);

    return () => clearTimeout(timer);
  }, [onComplete, data.duration]);

  return (
    <div className="confetti-wrapper">
      <div className="confetti-container">
        {/* יצירת 50 פתיתי קונפטי באופן דינמי */}
        {[...Array(50)].map((_, i) => (
          <div key={i} className={`confetti-piece piece-${i}`}></div>
        ))}
      </div>
      <h1 className="confetti-title">כל הכבוד! סיימת את הפרק!</h1>
    </div>
  );
}

export default ConfettiSlide;
