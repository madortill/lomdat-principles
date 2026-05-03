import { useState, useEffect } from "react";
import "./Popup.css";

function AccordionItem({ item, onOpen, isRead }) {
  // הוספנו isRead
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    if (!open) onOpen?.();
  };

  return (
    <div
      className={`accordion-item ${open ? "open" : ""}`}
      style={{ backgroundColor: item.color }}
      onClick={toggle}
    >
      <div className="accordion-title">
        {/* מציג וי אם הפריט נקרא */}
        {isRead && <span className="read-v">✔ </span>}
        {item.title}
      </div>
      <div className={`arrow ${open ? "open" : ""}`}>v</div>
      <div className="accordion-content">{item.text}</div>
    </div>
  );
}

function Popup({ data, onClose, wasCompleted }) {
  const [openedItems, setOpenedItems] = useState([]);

  useEffect(() => {
    if (wasCompleted && data.opens) {
      setOpenedItems(data.opens.map((_, i) => i));
    } else {
      setOpenedItems([]);
    }
  }, [wasCompleted, data]);

  const handleToggle = (index) => {
    setOpenedItems((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const allOpened =
    wasCompleted ||
    (data.who === "openDown" &&
      data.opens &&
      openedItems.length === data.opens.length) ||
    data.who !== "openDown"; // אם זה לא אקורדיון, הכפתור תמיד זמין

  return (
    <div className="popup-overlay-2">
      {data.who === "circles" && (
        <div className="popup-box-2">
          <h2 className="slide-title2 popup-title-2">{data.header}</h2>
          <p className="slide-text2">{data.text1}</p>

          <div className="circles">
            {data.circles.map((c, i) => (
              <div
                key={i}
                className={`circle ${
                  c.color === 1 ? "circle-red" : "circle-blue"
                }`}
              >
                {c.text}
              </div>
            ))}
          </div>

          <p className="info slide-text2 special-text">{data.info}</p>

          <button onClick={onClose} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {data.who === "drive" && (
        <div className="popup-box-2-drive">
          <h2 className="slide-title2 popup-title-2 popup-title-2-drive">
            {data.header}
          </h2>

          <div
            className={`popup-drive-2-content ${
              data.img ? "popup-drive-2-content-text" : ""
            }`}
          >
            {data.img && (
              <img src={data.img} alt="img" className="img-popup-2-drive" />
            )}
            <p className="slide-text2">{data.text1}</p>
          </div>

          <button onClick={onClose} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {data.who === "dont" && (
        <div className="popup-box-2-dont">
          <div
            className="slide-title2 popup-title-2 popup-title-2-drive popup-title-2-dont"
            dangerouslySetInnerHTML={{ __html: data.header }}
          ></div>

          <div className="donts">
            {data.donts.map((d, i) => (
              <div key={i} className="dont">
                <div className="slide-text-popup-dont slide-text-popup-dont-header">
                  {d.header}
                </div>
                <img src={d.img} className="donts-img" />
                <div
                  className="slide-text-popup-dont"
                  dangerouslySetInnerHTML={{ __html: d.text }}
                ></div>
              </div>
            ))}
          </div>

          <button onClick={onClose} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {data.who === "regular" && (
        <div className="popup-box-2">
          <h2 className="slide-title2 popup-title-2 popup-title-2-drive">
            {data.title}
          </h2>

          <div
            className={`popup-drive-2-content ${
              data.image ? "popup-drive-2-content-text" : ""
            }`}
          >
            {data.image && (
              <img src={data.image} alt="img" className="img-popup-2-drive" />
            )}
            <p className="slide-text2">{data.text}</p>
          </div>

          <button onClick={onClose} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {data.who === "openDown" && (
        <div className="popup-box-2-opendown">
          <h2 className="slide-title2 popup-title-2">{data.title}</h2>
          <p className="slide-text2">{data.text}</p>

          <div className="accordion">
            {data.opens.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                onOpen={() => handleToggle(i)}
                isRead={openedItems.includes(i)} // מעבירים את המצב לילד
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="close-btn close-btn-popup"
            disabled={!allOpened}
          >
            {data.btn}
          </button>
        </div>
      )}
    </div>
  );
}

export default Popup;
