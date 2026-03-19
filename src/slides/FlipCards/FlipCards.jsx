// import { useState } from "react";
// import "./FlipCards.css";

// function FlipCardsSlide({ data }) {

//     const [flipped, setFlipped] = useState(null)

//     return (

//         <div className="cards-container">

//             {data.cards.map((card, index) => (

//                 <div
//                     className={`flip-card ${flipped === index ? "flipped" : ""}`}
//                     onClick={() => setFlipped(index)}
//                     key={index}
//                 >

//                     <div className="flip-inner">

//                         <div className="front">

//                             <img src={card.front.image} />
//                             <p>{card.front.text}</p>

//                         </div>

//                         <div className="back">

//                             <img src={card.back.image} />
//                             <p>{card.back.text}</p>

//                         </div>

//                     </div>

//                 </div>

//             ))}

//         </div>

//     )

// }

// export default FlipCardsSlide



// import { useState } from "react";
// import "./FlipCards.css";

// function FlipCardsSlide({ data, unlock }) {
//     const [zoomImg, setZoomImg] = useState(null);

//     const [flipped, setFlipped] = useState(null);

//     return (
//         <div className="flipcards-slide">

//             <div className="slide-title">{data.header}</div>
//             <div className="slide-text">{data.text}</div>

//             <div className="cards-container">

//                 {data.cards.map((card, index) => (

//                     <div
//                         key={index}
//                         className={`flip-card ${flipped === index ? "flipped" : ""}`}
//                         onClick={() => {
//                             setFlipped(flipped === index ? null : index)
//                             unlock();
//                         }}
//                     >

//                         <div className="flip-inner">

//                             <div className="flip-front">
//                                 <img
//                                     src={card.front.image}
//                                     alt=""
//                                 />
//                                 <p>{card.front.text}</p>
//                             </div>

//                             <div className="flip-back">
//                                 <p>{card.back.text}</p>
//                                 {card.back.image !== null &&
//                                     <img
//                                         src={card.back.image}
//                                         alt="back img"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             setZoomImg(card.back.image);
//                                         }}
//                                     />}
//                             </div>

//                         </div>

//                     </div>

//                 ))}

//             </div>
//             {zoomImg && (

//                 <div className="image-zoom-overlay" onClick={() => setZoomImg(null)}>

//                     <img src={zoomImg} className="image-zoom" />

//                 </div>

//             )}

//         </div>
//     );
// }

// export default FlipCardsSlide;


import { useState } from "react";
import "./FlipCards.css";

function FlipCardsSlide({ data, unlock, setIsOverlayOpen }) {

    const [zoomImg, setZoomImg] = useState(null);
    const [flipped, setFlipped] = useState(null);
    const [opened, setOpened] = useState([]);

    return (
        <div className="flipcards-slide">

            <div className="slide-title">{data.header}</div>
            <div className="slide-text">{data.text}</div>

            <div className="cards-container">

                {data.cards.map((card, index) => (

                    <div
                        key={index}
                        className={`flip-card ${flipped === index ? "flipped" : ""}`}
                        onClick={() => {

                            setFlipped(flipped === index ? null : index);

                            if (!opened.includes(index)) {

                                const newOpened = [...opened, index];
                                setOpened(newOpened);

                                if (newOpened.length === data.cards.length) {
                                    unlock();
                                }

                            }

                        }}
                    >

                        <div className="flip-inner">

                            {opened.includes(index) && (
                                <div className="card-check">✔</div>
                            )}

                            <div className="flip-front">
                                <img src={card.front.image} alt="" />
                                <p>{card.front.text}</p>
                            </div>

                            <div className="flip-back">
                                <p>{card.back.text}</p>

                                {card.back.image !== null &&
                                    <img
                                        src={card.back.image}
                                        alt="back img"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setZoomImg(card.back.image);
                                            setIsOverlayOpen(true);
                                          }}
                                    />
                                }

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {zoomImg && (
                <div
                className="image-zoom-overlay"
                onClick={() => {
                  setZoomImg(null);
                  setIsOverlayOpen(false);
                }}
              >
                    <img src={zoomImg} className="image-zoom" />
                </div>
            )}

        </div>
    );
}

export default FlipCardsSlide;