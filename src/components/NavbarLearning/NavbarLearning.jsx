// import { useState } from "react";
// import "./NavbarLearning.css";

// function NavbarLearning({ sections, currentSlide, setCurrentSlide, maxVisitedSlide }) {

//     const [open, setOpen] = useState(false);

//     const handleJump = (slideIndex) => {

//         if (slideIndex > maxVisitedSlide) return;

//         setCurrentSlide(slideIndex);
//         setOpen(false);
//     };

//     return (
//         <div className="learning-navbar">

//             <div
//                 className="navbar-toggle"
//                 onClick={() => setOpen(!open)}
//             >
//                 ניווט בלומדה
//             </div>

//             {open && (

//                 <div className="navbar-dropdown">

//                     {sections.map((section, index) => {

//                         const locked = section.slideIndex > maxVisitedSlide;

//                         return (

//                             <div
//                                 key={index}
//                                 className={`navbar-item 
//                                 ${locked ? "locked" : ""} 
//                                 ${currentSlide === section.slideIndex ? "active" : ""}`}
//                                 onClick={() => handleJump(section.slideIndex)}
//                             >

//                                 {section.title}

//                             </div>

//                         )

//                     })}

//                 </div>

//             )}

//         </div>
//     );
// }

// export default NavbarLearning;












// import { useState } from "react";
// import "./NavbarLearning.css";

// function NavbarLearning({ sections, currentSlide, setCurrentSlide, maxVisitedSlide }) {

//     const [open, setOpen] = useState(false);

//     const handleJump = (slideIndex) => {
//         if (slideIndex > maxVisitedSlide) return;

//         setCurrentSlide(slideIndex);
//         setOpen(false);
//     };

//     return (
//         <div className="learning-navbar">

//             <div
//                 className="navbar-toggle"
//                 onClick={() => setOpen(!open)}
//             >
//                 זיהוי רכבים וסוגי נסיעות
//             </div>

//             {open && (

//                 <div className="navbar-dropdown">

//                     {sections.map((section, index) => {

//                         const locked = section.slideIndex > maxVisitedSlide;

//                         return (

//                             <div
//                                 key={index}
//                                 className={`plate 
//                                 ${locked ? "locked" : ""} 
//                                 ${currentSlide === section.slideIndex ? "active" : ""}`}
//                                 onClick={() => handleJump(section.slideIndex)}
//                             >

//                                 {/* <div className="plate-number">
//                                     {String(index + 1).padStart(3, "0")}-{String(section.slideIndex).padStart(2, "0")}
//                                 </div> */}

//                                 <div className="plate-title">
//                                     {section.title}
//                                 </div>

//                             </div>

//                         )

//                     })}

//                 </div>

//             )}

//         </div>
//     );
// }

// export default NavbarLearning;









import { useState, useRef, useEffect } from "react";
import "./NavbarLearning.css";

function NavbarLearning({ sectionsLearning1, currentSlide, setCurrentSlide, maxVisitedSlide }) {

    const [open, setOpen] = useState(false);
    const activeRef = useRef(null);

    const handleJump = (slideIndex) => {
        if (slideIndex > maxVisitedSlide) return;

        setCurrentSlide(slideIndex);
        setOpen(false);
    };

    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [currentSlide]);

    return (
        <div className="learning-navbar">

            <div
                className="navbar-toggle"
                onClick={() => setOpen(!open)}
            >
                זיהוי רכבים וסוגי נסיעות
            </div>

            {open && (

                <div className="navbar-dropdown">

                    {sectionsLearning1.map((section, index) => {

                        const locked = section.slideIndex > maxVisitedSlide;
                        const isActive = currentSlide === section.slideIndex;

                        return (

                            <div
                                key={index}
                                ref={isActive ? activeRef : null}
                                className={`plate 
                                ${locked ? "locked" : ""} 
                                ${isActive ? "active" : ""}`}
                                onClick={() => handleJump(section.slideIndex)}
                            >

                                <div className="plate-title">
                                    {section.title}
                                </div>

                                <div className="plate-il">IL</div>

                            </div>

                        )

                    })}

                </div>

            )}

        </div>
    );
}

export default NavbarLearning;