// import { useState } from "react";
// import "./QuestionOverlay.css";

// function QuestionSlide({ data, onCorrect }) {

//     const [selected, setSelected] = useState(null);
//     const [isCorrect, setIsCorrect] = useState(false);

//     function handleAnswer(answer, index) {

//         setSelected(index);

//         if (answer.correct) {
//             setIsCorrect(true);
//             onCorrect(true);
//         }

//     }

//     return (

//         <div className={`question-slide ${isLastQuestion ? "slide-up" : ""}`}>
//             <img src={garageSVG} className="garage-bg" />

//             <h2 className="question-title">
//                 {data.header}
//             </h2>

//             <div className="question-box">
//                 {data.question}
//             </div>

//             <div className="answers-grid">

//                 {data.answers.map((ans, index) => {

//                     let className = "answer";

//                     if (selected === index) {
//                         className = ans.correct ? "answer correct" : "answer wrong";
//                     }

//                     return (

//                         <div
//                         key={index}
//                         className={className}
//                         onClick={() => handleAnswer(ans, index)}
//                         >

//                             {ans.text}

//                         </div>

// )

// })}

//             </div>

//         </div>

// )

// }

// export default QuestionSlide







// import { useState , useEffect } from "react";
// import "./QuestionOverlay.css";

// function QuestionSlide({ data, onCorrect, isLastQuestion }) {
//     const [selected, setSelected] = useState(null);
//     const [isCorrect, setIsCorrect] = useState(false);

//     function handleAnswer(answer, index) {
//         setSelected(index);
//         if (answer.correct) {
//             setIsCorrect(true);
//         }
//     }

//     // איפוס מצב כשסלייד חדש נטען
//     useEffect(() => {
//         setSelected(null);
//         setIsCorrect(false);
//     }, [data.id]); // כאשר הסלייד משתנה

//     return (
//         <div className={`question-slide ${isLastQuestion ? "slide-up" : ""}`}>
//             <h2 className="question-title">{data.header}</h2>
//             <div className="question-box">{data.question}</div>

//             <div className="answers-grid">
//                 {data.answers.map((ans, index) => {
//                     let className = "answer";
//                     if (selected === index) {
//                         className = ans.correct ? "answer correct" : "answer wrong";
//                     }
//                     return (
//                         <div
//                             key={index}
//                             className={className}
//                             onClick={() => handleAnswer(ans, index)}
//                         >
//                             {ans.text}
//                         </div>
//                     );
//                 })}
//             </div>

//             <button
//                 className={`continue-btn ${!isCorrect ? "disabled" : ""}`}
//                 onClick={isCorrect ? onCorrect : null}
//             >
//                 המשך
//             </button>
//         </div>
//     );
// }

// export default QuestionSlide;





// import { useState, useEffect } from "react";
// import "./QuestionOverlay.css";

// function QuestionSlide({ data, onCorrect, isLastQuestion }) {
//   const [selected, setSelected] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [animate, setAnimate] = useState(false);

//   // איפוס מצב כשסלייד חדש נטען
//   useEffect(() => {
//     setSelected(null);
//     setIsCorrect(false);
//     setAnimate(true); // הפעלה מחדש של האנימציה
//   }, [data.id]);

//   function handleAnswer(answer, index) {
//     setSelected(index);
//     setIsCorrect(answer.correct);
//   }

//   return (
//     <div
//       key={data.id} // מבטיח React "מחדש" את הסלייד
//       className={`question-slide ${animate ? "slide-down" : ""} ${isLastQuestion ? "slide-up" : ""}`}
//     >
//       <h2 className="question-title">{data.header}</h2>
//       <div className="question-box">{data.question}</div>

//       <div className="answers-grid">
//         {data.answers.map((ans, index) => {
//           let className = "answer";
//           if (selected === index) {
//             className = ans.correct ? "answer correct" : "answer wrong";
//           }
//           return (
//             <div
//               key={index}
//               className={className}
//               onClick={() => handleAnswer(ans, index)}
//             >
//               {ans.text}
//             </div>
//           );
//         })}
//       </div>

//       <button
//         className={`continue-btn ${!isCorrect ? "disabled" : ""}`}
//         onClick={isCorrect ? onCorrect : null}
//       >
//         המשך
//       </button>
//     </div>
//   );
// }

// export default QuestionSlide;







import { useState, useEffect } from "react";
import "./QuestionOverlay.css";

function QuestionSlide({ data, onCorrect, isLastQuestion }) {
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setSelected(null);
    setIsCorrect(false);
    setAnimate(true);
  }, [data.id]);

  function handleAnswer(answer, index) {
    setSelected(index);
    setIsCorrect(answer.correct);
  }

  return (
    <div
      key={data.id}
      className={`question-slide ${animate ? "slide-down" : ""} ${isLastQuestion ? "slide-up" : ""}`}
    >
      <h2 className="question-title">{data.header}</h2>
      <div className="question-box">{data.question}</div>

      <div className="answers-grid">
        {data.answers.map((ans, index) => {
          let className = "answer";
          if (selected === index) className = ans.correct ? "answer correct" : "answer wrong";
          return (
            <div key={index} className={className} onClick={() => handleAnswer(ans, index)}>
              {ans.text}
            </div>
          );
        })}
      </div>

      <button
        className={`continue-btn ${!isCorrect ? "disabled" : ""}`}
        onClick={isCorrect ? onCorrect : null}
      >
        המשך
      </button>
    </div>
  );
}

export default QuestionSlide;