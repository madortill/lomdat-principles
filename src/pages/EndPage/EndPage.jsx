import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./EndPage.css";

import road from "../../assets/road.svg";
import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import lightingPole from "../../assets/LightingPole.svg";
import car from "../../assets/car-on-the-side.svg";
import logo from "../../assets/logo.png";
import tillBlackLogo from "../../assets/till_blacklogo.svg";
import bushLeft from "../../assets/bush-left.svg";
import bushRight from "../../assets/bush-right.svg";
import topic1 from "../../assets/car-plate-topic-1.svg";
import topic2 from "../../assets/car-plate-topic-2.svg";
import aboutIcon from "../../assets/aboutIcon.svg";
import mapal from "../../assets/keshet.svg";

function EndPage() {
    const navigate = useNavigate();
    const [inTopics, setInTopics] = useState(false);
    const [driveMode, setDriveMode] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAboutOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className="opening-page">

            <div className="ground-area">
                <img src={road} className="road-opening-page" />

                <img
                    src={lightingPole}
                    className={`lighting-pole-left ${driveMode ? "pole-move-left" : ""}`}
                />

                <img
                    src={lightingPole}
                    className={`lighting-pole-right ${driveMode ? "pole-move-right" : ""}`}
                />

                <img src={bushLeft} className="bush-left-open" />
                <img src={bushRight} className="bush-right-open" />

                <img
                    src={car}
                    className={`car-opening-page ${driveMode ? "car-drive" : ""}`}
                />
            </div>

            <img src={BigCloud} alt="big cloud" className="big-cloud-opening-page-left" />
            <img src={BigCloud} alt="big cloud" className="big-cloud-opening-page-right" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />
            <img src={tillBlackLogo} alt="till logo" className="till-logo-black-opening-page" />

            <div className="about-container">

                <img
                    src={aboutIcon}
                    className="about-btn about-btn-end"
                    onClick={() => setAboutOpen(!aboutOpen)}
                />

                {aboutOpen && (
                    <div className="about-popup">

                        {/* <h3>אודות הלומדה</h3> */}

                        <div className="about-section">
                            <strong>מפתחת ראשית:</strong>
                            <img src={mapal} className="about-dev-img" />
                            <span>טוראי קשת פרי</span>
                        </div>

                        <div className="about-section">
                            <strong>גרפיקה:</strong>
                            <span>טוראי קשת פרי</span>
                        </div>

                        <div className="about-section">
                            <strong>מומחי תוכן:</strong>
                            <span>סגן עדן רוקח</span>
                            <span>סמל שיר אשר לוי</span>
                        </div>

                        <div className="about-section">
                            <strong>רמ״ד טי״ל:</strong>
                            <span>רס”מ עדן בן חמו</span>
                        </div>

                        <div className="about-section">
                            <strong>גרסה:</strong>
                            <span>מרץ 2026</span>
                        </div>

                    </div>
                )}

            </div>

            <div className={`opening-content first ${inTopics ? "fade-out" : "fade-in"}`}>
                <img src={logo} className="logo-bahad13-end-page" />

                <div className="end-page-header">
                    כל הכבוד!! סיימתם את הלומדה :)
                </div>

                <div className="end-opening-page-header">עכשיו אתם מומחים בנושאים:</div>

                <div className="topics-opening-page-container">
                    <img src={topic1} className="topic" />
                    <img src={topic2} className="topic" />
                </div>

                <button  onClick={() => navigate("/")} className="start-btn-to-topics">
                    לתחילת הלומדה
                </button>
            </div>

        </div>
    );
}

export default EndPage;