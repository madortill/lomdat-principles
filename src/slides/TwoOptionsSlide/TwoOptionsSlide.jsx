import { useState } from "react";
import "./TwoOptionsSlide.css";

function TwoOptionsSlide({ data }) {

    const [popup,setPopup] = useState(null);

    return (
        <>
        <div className="two-options-slide">

            <h2 className="slide-title">{data.header}</h2>

            <div className="options-container">

                {data.options.map((opt,index)=>(

                    <div
                        className="option-card"
                        key={index}
                        onClick={()=>setPopup(opt.popup)}
                    >

                        <img src={opt.image} alt="" />

                        <p>{opt.title}</p>

                    </div>

                ))}

            </div>


        </div>
            {popup && (

                <div className="popup-overlay">

                    <div className="popup">

                        <div>{popup.title}</div>

                        <div className="popup-images">

                            {popup.image.map((img,i)=>(
                                <img key={i} src={img} alt="" />
                            ))}

                        </div>

                        <button
                        className="close-btn"
                        onClick={()=>setPopup(null)}
                        >
                        סגור
                        </button>

                    </div>

                </div>

            )}
            </>
    );
}

export default TwoOptionsSlide;