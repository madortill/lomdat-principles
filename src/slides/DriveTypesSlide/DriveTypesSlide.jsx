import { useState } from "react";
import "./DriveTypesSlide.css";

function DriveTypesSlide({ data, unlock }) {

    const [opened, setOpened] = useState([]);
    const [seen, setSeen] = useState([]);

    const toggleDrive = (index) => {

        let updatedOpened;

        if (opened.includes(index)) {
            updatedOpened = opened.filter(i => i !== index);
        } else {
            updatedOpened = [...opened, index];
        }

        setOpened(updatedOpened);

        if (!seen.includes(index)) {
            const updatedSeen = [...seen, index];
            setSeen(updatedSeen);

            if (updatedSeen.length === data.drives.length) {
                unlock();
            }
        }

    };

    return (

        <div className="drive-slide">

            <div className="slide-title">{data.header}</div>
            <div className="slide-text">{data.text}</div>

            <div className="roads">

                {data.drives.map((drive, index) => {

                    const active = opened.includes(index);

                    return (

                        <div
                            key={index}
                            className={`road ${active ? "active" : ""}`}
                            onClick={() => toggleDrive(index)}
                        >

                            {seen.includes(index) && <div className="check">✔</div>}

                            <img
                                src={drive.car}
                                className={`car ${active ? "drive-left" : "drive-right"}`}
                            />

                            {active && <div className="smoke"></div>}

                            <div className="road-text">

                                {!active && (
                                    <div className="drive-title">
                                        {drive.title}
                                    </div>
                                )}

                                {active && (
                                    <div className="drive-description">
                                        {drive.description}
                                    </div>
                                )}

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default DriveTypesSlide;