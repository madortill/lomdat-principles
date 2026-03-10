// import { useState } from "react";
// import slides from "../../data/slides.json";
// import "./LearningPage.css";
// import BigCloud from "../../assets/cloud-big.svg";
// import SmallCloud from "../../assets/cloud-small.svg";
// import logo from "../../assets/logo.png";
// import tillWhiteLogo from "../../assets/till_whitelogo.svg";
// import carFront from "../../assets/car-front.svg";
// import nextBtn from "../../assets/next-btn.svg";
// import backBtn from "../../assets/back-btn.svg";
// import NormalSlide from "../../slides/NormalSlide/NormalSlide";
// import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
// import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
// import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
// // import BillboardCarsSlide from "../../slides/BillboardCarsSlide/BillboardCarsSlide";
// import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";

// function LearningPage() {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [canContinue, setCanContinue] = useState(true);

//     const nextSlide = () => {
//         if (currentSlide < slides.length - 1) {
//             setCurrentSlide(currentSlide + 1);
//         }
//     };

//     const prevSlide = () => {
//         if (currentSlide > 0) {
//             setCurrentSlide(currentSlide - 1);
//         }
//     };

//     const renderSlide = () => {
//         const slide = slides[currentSlide];

//         if (slide.type === "question" && canContinue) {
//             setCanContinue(false)
//         }

//         switch (slide.type) {

//             case "normal":
//                 return <NormalSlide data={slide} />

//             case "flipCards":
//                 return <FlipCardsSlide data={slide} />

//             case "vehicleTypes":
//                 return <VehicleTypesSlide data={slide} />

//             case "twoOptions":
//                 return <TwoOptionsSlide data={slide} />

//             case "billboardCars":
//                 return <BillboardCarsSlide data={slide} />

//             case "question":
//                 return <QuestionSlide
//                     data={slide}
//                     onCorrect={() => { setCanContinue(true); nextSlide(); }}
//                     slideIndex={currentSlide}               // מספר הסלייד הנוכחי
//                     isLastQuestion={currentSlide === slides.length - 1}  // האם זו השאלה האחרונה
//                 />

//             default:
//                 return null
//         }
//     };

//     return (
//         <div className="learning-page">
//             <img src={logo} className="logo-bahad13-learning-pages" />
//             <img src={BigCloud} className="big-cloud-learning-page-left" />
//             <img src={BigCloud} className="big-cloud-learning-page-right" />
//             <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
//             <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />

//             <div className="car-wrapper">
//                 <img src={carFront} className="car-img" alt="car" />
//                 <div className="safe-area">

//                     <div className="slide-body">
//                         {renderSlide()}
//                     </div>

//                     <div className="nav-buttons-container">
//                         <img src={backBtn} onClick={prevSlide} className="btn-nav" />
//                         {/* <img src={nextBtn} onClick={nextSlide} className="btn-nav" /> */}
//                         <img
//                             src={nextBtn}
//                             onClick={canContinue ? nextSlide : null}
//                             className={`btn-nav ${!canContinue ? "disabled" : ""}`}
//                         />
//                     </div>

//                 </div>
//             </div>

//             <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
//         </div>
//     );
// }

// export default LearningPage;







// import { useState } from "react";
// import slides from "../../data/slides.json";
// import "./LearningPage.css";
// import BigCloud from "../../assets/cloud-big.svg";
// import SmallCloud from "../../assets/cloud-small.svg";
// import logo from "../../assets/logo.png";
// import tillWhiteLogo from "../../assets/till_whitelogo.svg";
// import carFront from "../../assets/car-front.svg";
// import nextBtn from "../../assets/next-btn.svg";
// import backBtn from "../../assets/back-btn.svg";
// import NormalSlide from "../../slides/NormalSlide/NormalSlide";
// import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
// import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
// import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
// import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
// import garageSVG from "../../assets/Shutter.svg"; // הרקע של הגראז' לשאלות

// function LearningPage() {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [canContinue, setCanContinue] = useState(true);

//     const nextSlide = () => {
//         if (currentSlide < slides.length - 1) {
//             setCurrentSlide(currentSlide + 1);
//             setCanContinue(true); // לאפשר המשך לסלייד הבא
//         }
//     };

//     const prevSlide = () => {
//         if (currentSlide > 0) {
//             setCurrentSlide(currentSlide - 1);
//         }
//     };

//     const slide = slides[currentSlide];

//     const renderSlide = () => {
//         switch (slide.type) {
//             case "normal":
//                 return <NormalSlide data={slide} />;
//             case "flipCards":
//                 return <FlipCardsSlide data={slide} />;
//             case "vehicleTypes":
//                 return <VehicleTypesSlide data={slide} />;
//             case "twoOptions":
//                 return <TwoOptionsSlide data={slide} />;
//             case "question":
//                 return (
//                     <QuestionSlide
//                         data={slide}
//                         onCorrect={() => nextSlide()}
//                         isLastQuestion={currentSlide === slides.length - 1}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="learning-page">
//             {/* רקע הגראז' רק אם זו שאלה */}
//             {slide.type === "question" && (
//                 <div className="garage-wrapper">
//                     <img src={garageSVG} className="garage-bg" alt="garage background" />
//                 </div>
//             )}
//             <img src={logo} className="logo-bahad13-learning-pages" />
//             <img src={BigCloud} className="big-cloud-learning-page-left" />
//             <img src={BigCloud} className="big-cloud-learning-page-right" />
//             <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
//             <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />

//             <div className="car-wrapper">
//                 <img src={carFront} className="car-img" alt="car" />
//                 <div className="safe-area">


//                     <div className="slide-body">{renderSlide()}</div>

//                     {/* כפתורי ניווט רק לסליידים רגילים */}
//                     {slide.type !== "question" && (
//                         <div className="nav-buttons-container">
//                             <img src={backBtn} onClick={prevSlide} className="btn-nav" />
//                             <img
//                                 src={nextBtn}
//                                 onClick={canContinue ? nextSlide : null}
//                                 className={`btn-nav ${!canContinue ? "disabled" : ""}`}
//                             />
//                         </div>
//                     )}

//                 </div>
//             </div>

//             <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
//         </div>
//     );
// }

// export default LearningPage;











// import { useState } from "react";
// import slides from "../../data/slides.json";
// import "./LearningPage.css";
// import BigCloud from "../../assets/cloud-big.svg";
// import SmallCloud from "../../assets/cloud-small.svg";
// import logo from "../../assets/logo.png";
// import tillWhiteLogo from "../../assets/till_whitelogo.svg";
// import carFront from "../../assets/car-front.svg";
// import nextBtn from "../../assets/next-btn.svg";
// import backBtn from "../../assets/back-btn.svg";
// import NormalSlide from "../../slides/NormalSlide/NormalSlide";
// import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
// import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
// import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
// import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
// import garageSVG from "../../assets/Shutter.svg";

// function LearningPage() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     if (currentSlide < slides.length - 1) {
//       setCurrentSlide(currentSlide + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
//   };

//   const slide = slides[currentSlide];

//   const renderSlide = () => {
//     switch (slide.type) {
//       case "normal":
//         return <NormalSlide data={slide} />;
//       case "flipCards":
//         return <FlipCardsSlide data={slide} />;
//       case "vehicleTypes":
//         return <VehicleTypesSlide data={slide} />;
//       case "twoOptions":
//         return <TwoOptionsSlide data={slide} />;
//       case "question":
//         return (
//           <QuestionSlide
//             data={slide}
//             onCorrect={nextSlide}
//             isLastQuestion={currentSlide === slides.length - 1}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="learning-page">
//       {/* רקע הגראז' */}
//       {slide.type === "question" && (
//         <div className="garage-wrapper">
//           <img src={garageSVG} className="garage-bg" alt="garage background" />
//         </div>
//       )}

//       {/* עננים ולוגו */}
//       <img src={logo} className="logo-bahad13-learning-pages" />
//       <img src={BigCloud} className="big-cloud-learning-page-left" />
//       <img src={BigCloud} className="big-cloud-learning-page-right" />
//       <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-left" />
//       <img src={SmallCloud} alt="small cloud" className="small-cloud-opening-page-right" />

//       {/* הרכב + SAFE AREA */}
//       <div className="car-wrapper">
//         <img src={carFront} className="car-img" alt="car" />
//         <div className="safe-area">
//           <div className="slide-body">{renderSlide()}</div>

//           {/* כפתורי ניווט לסליידים רגילים */}
//           {slide.type !== "question" && (
//             <div className="nav-buttons-container">
//               <img src={backBtn} onClick={prevSlide} className="btn-nav" />
//               <img
//                 src={nextBtn}
//                 onClick={nextSlide}
//                 className="btn-nav"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
//     </div>
//   );
// }

// export default LearningPage;






// import { useState } from "react";
// import slides from "../../data/slides.json";
// import "./LearningPage.css";
// import BigCloud from "../../assets/cloud-big.svg";
// import SmallCloud from "../../assets/cloud-small.svg";
// import logo from "../../assets/logo.png";
// import tillWhiteLogo from "../../assets/till_whitelogo.svg";
// import carFront from "../../assets/car-front.svg";
// import nextBtn from "../../assets/next-btn.svg";
// import backBtn from "../../assets/back-btn.svg";
// import NormalSlide from "../../slides/NormalSlide/NormalSlide";
// import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
// import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
// import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
// import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
// import garageSVG from "../../assets/Shutter.svg";

// function LearningPage() {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const nextSlide = () => {
//         if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
//     };

//     const slide = slides[currentSlide];

//     const renderSlide = () => {
//         switch (slide.type) {
//             case "normal":
//                 return <NormalSlide data={slide} />;
//             case "flipCards":
//                 return <FlipCardsSlide data={slide} />;
//             case "vehicleTypes":
//                 return <VehicleTypesSlide data={slide} />;
//             case "twoOptions":
//                 return <TwoOptionsSlide data={slide} />;
//             case "question":
//                 return (
//                     <QuestionSlide
//                         data={slide}
//                         onCorrect={nextSlide}
//                         isLastQuestion={currentSlide === slides.length - 1}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="learning-page">
//             {/* עננים ולוגו */}
//             <img src={logo} className="logo-bahad13-learning-pages" />
//             <img src={BigCloud} className="big-cloud-learning-page-left" />
//             <img src={BigCloud} className="big-cloud-learning-page-right" />
//             <img src={SmallCloud} className="small-cloud-opening-page-left" />
//             <img src={SmallCloud} className="small-cloud-opening-page-right" />

//             {/* רקע הגראז' */}
//             {slide.type === "question" && (
//                 <div className="garage-wrapper">
//                     <img src={garageSVG} className="garage-bg" alt="garage" />
//                 </div>
//             )}

//             {/* הרכב */}
//             <div className="car-wrapper">
//                 <img src={carFront} className="car-img" alt="car" />
//             </div>

//             {/* הסלייד עצמו */}
//             <div className="slide-wrapper">{renderSlide()}</div>

//             {/* ניווט לסליידים רגילים */}
//             {slide.type !== "question" && (
//                 <div className="nav-buttons-container">
//                     <img src={backBtn} onClick={() => setCurrentSlide(currentSlide - 1)} className="btn-nav" />
//                     <img src={nextBtn} onClick={() => setCurrentSlide(currentSlide + 1)} className="btn-nav" />
//                 </div>
//             )}

//             <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
//         </div>
//     );
// }

// export default LearningPage;




import { useState, useEffect } from "react";
import slides from "../../data/slides.json";
import "./LearningPage.css";

import BigCloud from "../../assets/cloud-big.svg";
import SmallCloud from "../../assets/cloud-small.svg";
import logo from "../../assets/logo.png";
import tillWhiteLogo from "../../assets/till_whitelogo.svg";
import carFront from "../../assets/car-front.svg";
import nextBtn from "../../assets/next-btn.svg";
import backBtn from "../../assets/back-btn.svg";

import NormalSlide from "../../slides/NormalSlide/NormalSlide";
import FlipCardsSlide from "../../slides/FlipCards/FlipCards";
import VehicleTypesSlide from "../../slides/VehicleTypesSlide/VehicleTypesSlide";
import TwoOptionsSlide from "../../slides/TwoOptionsSlide/TwoOptionsSlide";
import QuestionSlide from "../../components/QuestionOverlay/QuestionOverlay";
import garageSVG from "../../assets/Shutter.svg";

function LearningPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showGarage, setShowGarage] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    };

    const slide = slides[currentSlide];

    // בדיקה אם הגראז' צריך להופיע או להיעלם
    useEffect(() => {
        if (!firstLoad) {
            if (slide.type === "question") setShowGarage(true);
            else setShowGarage(false);
        } else {
            // בעמוד הראשון – אם זה שאלה, הגראז' יורד, אחרת נשאר מוסתר
            if (slide.type === "question") setShowGarage(true);
            setFirstLoad(false);
        }
    }, [slide]);

    const renderSlide = () => {
        switch (slide.type) {
            case "normal":
                return <NormalSlide data={slide} />;
            case "flipCards":
                return <FlipCardsSlide data={slide} />;
            case "vehicleTypes":
                return <VehicleTypesSlide data={slide} />;
            case "twoOptions":
                return <TwoOptionsSlide data={slide} />;
            case "question":
                return (
                    <QuestionSlide
                        key={slide.id} // מבטיח איפוס state
                        data={slide}
                        onCorrect={nextSlide}
                        isLastQuestion={currentSlide === slides.length - 1}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="learning-page">
            {/* עננים ולוגו */}
            <img src={logo} className="logo-bahad13-learning-pages" />
            <img src={BigCloud} className="big-cloud-learning-page-left" />
            <img src={BigCloud} className="big-cloud-learning-page-right" />
            <img src={SmallCloud} className="small-cloud-opening-page-left" />
            <img src={SmallCloud} className="small-cloud-opening-page-right" />

            {/* רקע הגראז' עם אנימציה לירידה/עלייה */}
            <div className={`garage-wrapper ${showGarage ? "slide-down" : "slide-up"}`}>
                <img src={garageSVG} className="garage-bg" alt="garage" />
            </div>

            {/* הרכב */}
            <div className="car-wrapper">
                <img src={carFront} className="car-img" alt="car" />
            </div>

            {/* סלייד רגיל */}
            {slide.type !== "question" && (
                <div className="slide-wrapper">
                    <div className="safe-area">
                        {renderSlide()}
                    </div>
                </div>
            )}

            {/* כפתורי ניווט לסליידים רגילים */}
            {slide.type !== "question" && (
                <div className="nav-buttons-container">
                    <img
                        src={backBtn}
                        onClick={prevSlide}
                        className={`btn-nav ${currentSlide === 0 ? "disabled" : ""}`}
                    />
                    <img
                        src={nextBtn}
                        onClick={nextSlide}
                        className={`btn-nav ${currentSlide === slides.length - 1 ? "disabled" : ""}`}
                    />
                </div>
            )}

            {/* Overlay לשאלות */}
            {slide.type === "question" && (
                <div className="question-overlay-container">
                    <div className="garage-wrapper">
                        <img src={garageSVG} className="garage-bg" alt="garage" />
                    </div>
                    {renderSlide()}
                </div>
            )}

            <img src={tillWhiteLogo} className="till-logo-white-learning-pages" />
        </div>
    );
}

export default LearningPage;