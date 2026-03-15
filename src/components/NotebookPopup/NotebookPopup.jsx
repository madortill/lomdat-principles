import "./NotebookPopup.css";
import notebook from "../../assets/notebook.svg";
import check from "../../assets/check.svg";

function NotebookPopup({ data, onClose }) {

    return (
        <div className="popup-overlay">

            <div className="notebook-popup">

                <img src={notebook} alt="" className="notebook-bg" />

                <button
                    className="close-x"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="notebook-content">

                    <div className="notebook-title">
                        {data.title}
                    </div>

                    <div className="notebook-text">
                        {data.text}
                    </div>

                    <div className="notebook-checklist">

                        {data.checklist.map((item, index) => (

                            <div
                                className="check-row"
                                key={index}
                            >

                                {/* <span className="check-icon">✔</span> */}
                                <img src={check} alt="" className="check-icon-img" />

                                <span className="check-text">
                                    {item}
                                </span>

                            </div>

                        ))}

                    </div>

                    {data.note && (

                        <div className="notebook-note">
                            {data.note}
                        </div>

                    )}

                </div>

            </div>

        </div>
    );

}

export default NotebookPopup;