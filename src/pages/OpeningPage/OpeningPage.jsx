import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./OpeningPage.css";
import road from "../../assets/road.svg";
import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import lightingPole from "../../assets/lightingPole.svg";
import car from "../../assets/car-on-the-side.svg";
import logo from "../../assets/logo.png";
import tillBlackLogo from "../../assets/till_blacklogo.svg";
import bushLeft from "../../assets/bush-left.svg";
import bushRight from "../../assets/bush-right.svg";

function OpeningPage() {
    const navigate = useNavigate();
    const [inTopics, setInTopics] = useState(false);

    const handleToTopics = () => {
        setInTopics(true);
    };

    return (
        <div className="opening-page">

            <img src={road} alt="road" className="road-opening-page" />
            <img src={lightingPole} alt="lighting pole" className="lighting-pole-opening-page-left" />
            <img src={lightingPole} alt="lighting pole" className="lighting-pole-opening-page-right" />
            <img src={BigCloud} alt="big cloud" className="big-cloud-opening-page-left" />
            <img src={BigCloud} alt="big cloud" className="big-cloud-opening-page-right" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
            <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />
            <img src={car} alt="car" className="car-opening-page" />
            <img src={logo} alt="logo bahad 13" className="logo-bahad13-opening-page" />
            <img src={tillBlackLogo} alt="till logo" className="till-logo-black-opening-page" />
            <img src={bushLeft} alt="bush left" className="bush-left-opening-page" />
            <img src={bushRight} alt="bush right" className="bush-right-opening-page" />

            {!inTopics && <>
                <h1 className="opening-page-header">ברוכים הבאים ללומדת תעבורה</h1>

                <button onClick={handleToTopics} className="start-btn-to-topics">להתחלת הלומדה</button>
            </>}

            {inTopics && <>
                <div className="topics">
                    <p>נלמד היום:</p>
                    <ul>
                        <li>זיהוי כלי רכב</li>
                        <li>לוחיות רישוי</li>
                        <li>התנהגות בכביש</li>
                    </ul>
                </div>

                <button onClick={() => navigate("/learning")}>
                    התחל
                </button>
            </>}

        </div>
    );
}

export default OpeningPage;