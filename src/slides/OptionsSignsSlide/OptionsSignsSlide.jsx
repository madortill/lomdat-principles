import { useState, useEffect } from "react";
import "./OptionsSignsSlide.css";
import Popup from "../../components/Popup/Popup";

function OptionsSignsSlide({ data, unlock, wasCompleted }) {
  // אם הושלם - ה-activeIndex הוא -1 (הכל פתוח), אם לא - מתחילים מ-0
  const [activeIndex, setActiveIndex] = useState(wasCompleted ? -1 : 0);
  const [openPopup, setOpenPopup] = useState(null);

  // אם הושלם - מערך ה-visited מלא בכל התמרורים
  const [visited, setVisited] = useState(
    wasCompleted ? data.options.map((_, i) => i) : []
  );

  const handleClick = (index) => {
    const isVisited = visited.includes(index);
    const isActive = index === activeIndex;

    if (!isVisited && !isActive) return;

    setOpenPopup(data.options[index].popup);

    if (!isVisited) {
      setVisited((prev) => [...prev, index]);
    }
  };

  const handleClose = () => {
    const closedIndex = data.options.findIndex(
      (opt) => opt.popup === openPopup
    );
    setOpenPopup(null);

    if (closedIndex === activeIndex) {
      const nextIndex = activeIndex + 1;

      if (nextIndex < data.options.length) {
        setActiveIndex(nextIndex);
      } else {
        setActiveIndex(-1);
        if (!wasCompleted) unlock?.(); // משחרר רק בפעם הראשונה
      }
    }
  };

  return (
    <div>
      <h2 className="slide-title2">{data.header}</h2>
      <p className="slide-text2">{data.introText}</p>
      <div className="signs-on-road-imgs">
        {data.options.map((option, index) => {
          const isVisited = visited.includes(index);
          const isActive = index === activeIndex;

          return (
            <div key={index} className="sign-wrapper">
              {isVisited && <div className="checkmark">✔</div>}
              <img
                src={option.image}
                className={`sign-img 
                    ${isVisited ? "available" : ""}
                    ${isActive && !isVisited ? "active" : ""}
                  `}
                onClick={() => handleClick(index)}
              />
            </div>
          );
        })}
      </div>

      {openPopup && (
        <Popup
          data={openPopup}
          onClose={handleClose}
          // חשוב: אם הסלייד כולו הושלם, גם הפופאפים שלו נחשבים מושלמים
          wasCompleted={wasCompleted}
        />
      )}
    </div>
  );
}

export default OptionsSignsSlide;
