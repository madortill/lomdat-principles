import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./OpeningPage.css";
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

function OpeningPage() {
    const navigate = useNavigate();
    const [inTopics, setInTopics] = useState(false);
    const [driveMode, setDriveMode] = useState(false);

    const handleToTopics = () => {
        setDriveMode(true);

        setTimeout(() => {
            setInTopics(true);
        }, 2000);
    };

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

                <img src={bushLeft} className="bush-left" />
                <img src={bushRight} className="bush-right" />

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

            {/* {!inTopics &&
                <div className="opening-content">

                    <img src={logo} alt="logo bahad 13" className="logo-bahad13-opening-page" />

                    <h1 className="opening-page-header">
                        ברוכים הבאים ללומדת תעבורה
                    </h1>

                    <button onClick={handleToTopics} className="start-btn-to-topics">
                        להתחלת הלומדה
                    </button>

                </div>}

            {inTopics && <>
                <img src={logo} alt="logo bahad 13" className="logo-bahad13-opening-page-topics" />

                <div className="opening-content">
                    <div className="topics">
                        <p className="topics-opening-page-header">מה נלמד היום?</p>
                        <div className="topics-opening-page-container">
                            <img src={topic1} className="topic" alt="topic 1" />
                            <img src={topic2} className="topic" alt="topic 2" />
                        </div>
                    </div>

                    <button onClick={() => navigate("/learning")} className="start-btn-to-topics" >
                        בואו נתחיל!
                    </button>
                </div>
            </>} */}

            <div className={`opening-content first ${inTopics ? "fade-out" : "fade-in"}`}>
                <img src={logo} className="logo-bahad13-opening-page" />

                <h1 className="opening-page-header">
                    ברוכים הבאים ללומדת תעבורה
                </h1>

                <button onClick={handleToTopics} className="start-btn-to-topics">
                    להתחלת הלומדה
                </button>
            </div>


            <div className={`topics-screen ${inTopics ? "fade-in" : "hidden"}`}>
                <img src={logo} className="logo-bahad13-opening-page-topics" />

                <div className="opening-content-topics">
                    <div className="topics">
                        <p className="topics-opening-page-header">מה נלמד היום?</p>

                        <div className="topics-opening-page-container">
                            <img src={topic1} className="topic" />
                            <img src={topic2} className="topic" />
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/learning")}
                        className="start-btn-to-topics"
                    >
                        בואו נתחיל!
                    </button>
                </div>
            </div>

        </div>
    );
}

export default OpeningPage;