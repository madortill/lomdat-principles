import "./TwoRoadSigns.css";
import policeCar from "../../assets/police-car-on-the-side.svg";

// שיניתי לשם עם אות גדולה (PascalCase)
function TwoRoadSigns({ data, onClose }) {
  return (
    <div>
      <div className="learning-content-2">
        <h2 className="slide-title2">{data.header}</h2>
        <div className="slide-text2">{data.text}</div>
      </div>
      <div className="signs-on-road">
        {/* שימוש ב-map כדי לעבור על כל ה-signs במערך */}
        {data.signs.map((sign, index) => (
          <div
            key={index}
            className={`sign-on-road-2 ${
              sign.color === 1 ? "sign-on-road-2-green" : "sign-on-road-2-blue"
            }`}
          >
            <div className="content-border-2">
              <div className="slide-text-signs-number">{sign.number}</div>
              <div className="slide-text-popup-dont">{sign.text}</div>
            </div>
            <div className="sign-legs-2"></div>
          </div>
        ))}
      </div>
      <img src={policeCar} alt="police car" className="police-car-2" />
    </div>
  );
}

export default TwoRoadSigns;
