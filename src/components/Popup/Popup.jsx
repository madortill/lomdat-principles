import "./Popup.css";

function Popup({ data, onClose }) {
    console.log("POPUP DATA:", data);
    return (
      <div className="popup-overlay-2">
        <div className="popup-box-2">
          <h2 className="slide-title2 popup-title-2">{data.header}</h2>
          <p className="slide-text2">{data.text1}</p>
  
          <div className="circles">
            {data.circles.map((c, i) => (
              <div key={i} className={`circle ${c.color === 1 ? "circle-red" : "circle-blue"}`}>
                {c.text}
              </div>
            ))}
          </div>
  
          <p className="info slide-text2 special-text">{data.info}</p>
  
          <button onClick={onClose} className="close-btn">{data.btn}</button>
        </div>
      </div>
    );
  }

export default Popup;
