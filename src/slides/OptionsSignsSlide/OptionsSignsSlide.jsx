import { useState, useEffect } from "react";
import "./OptionsSignsSlide.css";
import Popup from "../../components/Popup/Popup";

function OptionsSignsSlide({ data, unlock }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openPopup, setOpenPopup] = useState(null);
  const [visited, setVisited] = useState([]);

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
    setOpenPopup(null);

    const nextIndex = activeIndex + 1;

    if (nextIndex < data.options.length) {
      setActiveIndex(nextIndex);
    } else {
      setActiveIndex(-1);
      unlock?.();
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

      {openPopup && <Popup data={openPopup} onClose={handleClose} />}
    </div>
  );
}

export default OptionsSignsSlide;
