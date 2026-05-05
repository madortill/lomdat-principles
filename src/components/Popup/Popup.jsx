import { useState, useEffect } from "react";
import "./Popup.css";

function AccordionItem({ item, onOpen, isRead }) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
    if (!open) onOpen?.();
  };

  return (
    <div
      className={`accordion-item ${open ? "open" : ""}`}
      style={{ backgroundColor: item.color, position: "relative" }} // הוספנו relative כדי שהוי יתמקם נכון
      onClick={toggle}
    >
      {/* כאן השינוי - הוי העיצובי */}
      {isRead && <div className="card-check">✔</div>}

      <div className="accordion-title">{item.title}</div>
      <div className={`arrow ${open ? "open" : ""}`}>v</div>
      <div className="accordion-content">{item.text}</div>
    </div>
  );
}

function Popup({ data, onClose, wasCompleted, initialOpenedItems = [] }) {
  const [zoomImg, setZoomImg] = useState(null);

  const openZoom = (img) => {
    setZoomImg(img);
    setIsOverlayOpen(true);
  };

  const closeZoom = () => {
    setZoomImg(null);
    setIsOverlayOpen(false);
  };

  // מאתחלים את הסטייט עם מה שקיבלנו מהאבא (או מערך ריק כברירת מחדל)
  const [openedItems, setOpenedItems] = useState(initialOpenedItems);

  useEffect(() => {
    if (wasCompleted && data.opens) {
      setOpenedItems(data.opens.map((_, i) => i));
    }
  }, [wasCompleted, data]);

  const handleToggle = (index) => {
    if (!openedItems.includes(index)) {
      setOpenedItems((prev) => [...prev, index]);
    }
  };

  const allOpened =
    wasCompleted ||
    (data.who === "openDown" &&
      data.opens &&
      openedItems.length === data.opens.length) ||
    data.who !== "openDown";

  return (
    <div className="popup-overlay-2">
      {/* סוג: circles */}
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
          {/* עדכון: שולחים את openedItems בסגירה */}
          <button onClick={() => onClose(openedItems)} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {/* סוג: drive */}
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
            <p
              className={`slide-text2 ${
                data.side ? "slide-text2-on-right" : ""
              }`}
            >
              {data.text1}
            </p>
          </div>
          <button onClick={() => onClose(openedItems)} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {/* סוג: dont */}
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
                <img src={d.img} className="donts-img" alt="" />
                <div
                  className="slide-text-popup-dont"
                  dangerouslySetInnerHTML={{ __html: d.text }}
                ></div>
              </div>
            ))}
          </div>
          <button onClick={() => onClose(openedItems)} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {/* סוג: regular */}
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
            <p className={`slide-text2 ${data.side && "slide-text2-on-right"}`}>
              {data.text}
            </p>
          </div>
          <button onClick={() => onClose(openedItems)} className="close-btn">
            {data.btn}
          </button>
        </div>
      )}

      {/* סוג: openDown (אקורדיון) */}
      {data.who === "openDown" && (
        <div className="popup-box-2-opendown">
          <h2 className="slide-title2 popup-title-2">{data.title}</h2>
          <p className="slide-text2">{data.text}</p>
          <p className="popup-text2-opendown">{data.text2}</p>
          <div className="accordion">
            {data.opens.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                onOpen={() => handleToggle(i)}
                isRead={openedItems.includes(i)}
              />
            ))}
          </div>

          <div className="img-wrapper-opendown">
            <img
              src={data.image}
              alt="img-dropdown"
              className="img-popup-2-opendown"
              onClick={() => openZoom(data.image)}
            />
          </div>

          <button
            onClick={() => onClose(openedItems)} // שולחים את הרשימה המלאה בסיום
            className="close-btn close-btn-popup"
            disabled={!allOpened}
          >
            {data.btn}
          </button>
        </div>
      )}

      {zoomImg && (
        <div className="image-zoom-overlay-opendown" onClick={closeZoom}>
          <img src={zoomImg} className="image-zoom" />
        </div>
      )}
    </div>
  );
}

export default Popup;
