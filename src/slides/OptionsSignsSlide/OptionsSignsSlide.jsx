import { useState, useEffect } from "react";
import "./OptionsSignsSlide.css";
import Popup from "../../components/Popup/Popup";

function OptionsSignsSlide({ data, unlock, wasCompleted }) {
  const [activeIndex, setActiveIndex] = useState(wasCompleted ? -1 : 0);
  const [openPopup, setOpenPopup] = useState(null);
  const [visited, setVisited] = useState(
    wasCompleted ? data.options.map((_, i) => i) : []
  );
  const [popupMemory, setPopupMemory] = useState({});

  const handleClick = (index) => {
    const isVisited = visited.includes(index);
    const isActive = index === activeIndex;
    if (!isVisited && !isActive) return;

    // שומרים רק את הנתונים הנחוצים
    setOpenPopup({ ...data.options[index].popup, optionIndex: index });

    if (!isVisited) {
      setVisited((prev) => [...prev, index]);
    }
  };

  // הפונקציה הזו מקבלת את האינדקס ואת הסטייט של הפופאפ שנסגר
  const handleClose = (optionIndex, openedItemsFromPopup) => {
    if (optionIndex !== undefined) {
      setPopupMemory((prev) => ({
        ...prev,
        [optionIndex]: openedItemsFromPopup,
      }));
    }

    setOpenPopup(null);

    // בדיקה אם סיימנו את הסלייד הנוכחי כדי לפתוח את הבא
    if (optionIndex === activeIndex) {
      const nextIndex = activeIndex + 1;
      if (nextIndex < data.options.length) {
        setActiveIndex(nextIndex);
      } else {
        setActiveIndex(-1);
        if (!wasCompleted) unlock?.();
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

          // בתוך ה-map של ה-options:
          return (
            <div
              key={index}
              className="sign-wrapper"
              style={{ position: "relative" }}
            >
              {isVisited && <div className="card-check">✔</div>}

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
          onClose={(itemsFromPopup) =>
            handleClose(openPopup.optionIndex, itemsFromPopup)
          }
          initialOpenedItems={popupMemory[openPopup.optionIndex] || []}
          wasCompleted={wasCompleted}
        />
      )}
    </div>
  );
}

export default OptionsSignsSlide;
