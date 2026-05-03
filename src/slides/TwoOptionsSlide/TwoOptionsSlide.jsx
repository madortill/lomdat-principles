import { useState, useEffect } from "react";
import "./TwoOptionsSlide.css";
import NotebookPopup from "../../components/NotebookPopup/NotebookPopup";

function TwoOptionsSlide({ data, unlock, setIsOverlayOpen, wasCompleted }) {
  const [popup, setPopup] = useState(null);
  const [zoomImg, setZoomImg] = useState(null);

  // 2. איתחול חכם של הסטייט opened
  const [opened, setOpened] = useState(
    wasCompleted ? data.options.map((_, index) => index) : []
  );

  const handleClick = (opt, index) => {
    if (!opened.includes(index)) {
      const newOpened = [...opened, index];
      setOpened(newOpened);

      if (newOpened.length === data.options.length) {
        if (unlock) unlock(); // זה יקרא ל-markSlideAsComplete ב-LearningPage
      }
    }

    if (opt.type === "images") {
      setPopup(opt.popup);
    } else {
      setPopup(opt);
    }
    
    setIsOverlayOpen(true);
  };

  useEffect(() => {
    if (popup || zoomImg) {
      setIsOverlayOpen(true);
    } else {
      setIsOverlayOpen(false);
    }
  }, [popup, zoomImg]);

  return (
    <>
      <div className="two-options-slide">
        <div className="slide-title">{data.header}</div>
        <div className="slide-text">{data.text}</div>

        <div className="options-container">
          {data.options.map((opt, index) => (
            <div
              className="option-card"
              key={index}
              onClick={() => handleClick(opt, index)}
            >
              {/* וי */}
              {opened.includes(index) && <div className="check-mark">✔</div>}

              <img src={opt.image} alt="" className="option-img" />

              <p>{opt.title}</p>
            </div>
          ))}
        </div>
      </div>

      {popup && popup.type === "notebook" && (
        <NotebookPopup
          data={popup}
          onClose={() => {
            setPopup(null);
            // setIsOverlayOpen(false);
          }}
        />
      )}

      {popup && popup.type === "images" && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="slide-title">{popup.title}</div>
            <div className="slide-text">{popup.text}</div>

            <div className="popup-images">
              {popup.image.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  onClick={() => {
                    setZoomImg(img);
                    // setIsOverlayOpen(true);
                  }}
                />
              ))}
            </div>

            <button
              className="close-btn"
              onClick={() => {
                setPopup(null);
                // setIsOverlayOpen(false);
              }}
            >
              הבנתי!
            </button>
          </div>
        </div>
      )}

      {zoomImg && (
        <div
          className="image-zoom-overlay"
          onClick={() => {
            setZoomImg(null);
            // setIsOverlayOpen(false); 
          }}
        >
          <img src={zoomImg} className="image-zoom" />
        </div>
      )}
    </>
  );
}

export default TwoOptionsSlide;
