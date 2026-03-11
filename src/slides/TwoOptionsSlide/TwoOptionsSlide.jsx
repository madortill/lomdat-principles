// import { useState } from "react";
// import "./TwoOptionsSlide.css";

// function TwoOptionsSlide({ data }) {

//     const [popup,setPopup] = useState(null);

//     return (
//         <>
//         <div className="two-options-slide">

//             <h2 className="slide-title">{data.header}</h2>

//             <div className="options-container">

//                 {data.options.map((opt,index)=>(

//                     <div
//                         className="option-card"
//                         key={index}
//                         onClick={()=>setPopup(opt.popup)}
//                     >

//                         <img src={opt.image} alt="" className="option-img" />

//                         <p>{opt.title}</p>

//                     </div>

//                 ))}

//             </div>


//         </div>
//             {popup && (

//                 <div className="popup-overlay">

//                     <div className="popup">

//                         <div className="slide-title">{popup.title}</div>

//                         <div className="popup-images">

//                             {popup.image.map((img,i)=>(
//                                 <img key={i} src={img} alt="" />
//                             ))}

//                         </div>

//                         <button
//                         className="close-btn"
//                         onClick={()=>setPopup(null)}
//                         >
//                         הבנתי!
//                         </button>

//                     </div>

//                 </div>

//             )}
//             </>
//     );
// }

// export default TwoOptionsSlide;











import { useState } from "react";
import "./TwoOptionsSlide.css";

function TwoOptionsSlide({ data, unlock }) {

    const [popup, setPopup] = useState(null);
    const [opened, setOpened] = useState([]);

    const handleClick = (opt, index) => {

        if (!opened.includes(index)) {

            const newOpened = [...opened, index];
            setOpened(newOpened);

            if (newOpened.length === data.options.length) {
                if (unlock) unlock();
            }
        }

        setPopup(opt.popup);
    };

    return (
        <>
            <div className="two-options-slide">

                <h2 className="slide-title">{data.header}</h2>

                <div className="options-container">

                    {data.options.map((opt, index) => (

                        <div
                            className="option-card"
                            key={index}
                            onClick={() => handleClick(opt, index)}
                        >

                            {/* וי */}
                            {opened.includes(index) && (
                                <div className="check-mark">✔</div>
                            )}

                            <img src={opt.image} alt="" className="option-img" />

                            <p>{opt.title}</p>

                        </div>

                    ))}

                </div>

            </div>

            {popup && (

                <div className="popup-overlay">

                    <div className="popup">

                        <div className="slide-title">{popup.title}</div>

                        <div className="popup-images">

                            {popup.image.map((img, i) => (
                                <img key={i} src={img} alt="" />
                            ))}

                        </div>

                        <button
                            className="close-btn"
                            onClick={() => setPopup(null)}
                        >
                            הבנתי!
                        </button>

                    </div>

                </div>

            )}
        </>
    );
}

export default TwoOptionsSlide;