import { useState, useEffect } from "react";
import "./QuestionOverlay.css";
import BlueAns from "../../assets/answer-blue.svg";
import RedAns from "../../assets/answer-red.svg";
import GreenAns from "../../assets/answer-green.svg";

function QuestionSlide({ data, onCorrect, isLastQuestion }) {
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setSelected(null);
        setIsCorrect(false);
        setAnimate(true);
    }, [data.id]);

    // function handleAnswer(answer, index) {
    //     setSelected(index);
    //     setIsCorrect(answer.correct);
    // }

    function handleAnswer(answer, index) {
        setSelected(index);
        setIsCorrect(answer.correct);

        // אפקט אנימציה קצר
        const ansEl = document.querySelectorAll(".answer")[index];
        if (!ansEl) return;

        ansEl.classList.remove("animate-pop", "animate-shake");

        void ansEl.offsetWidth; // force reflow כדי לאתחל אנימציה

        if (answer.correct) {
            ansEl.classList.add("animate-pop");
            // ansEl.classList.add("animate-glow");
        } else {
            ansEl.classList.add("animate-shake");
        }
    }

    return (
        <div
            key={data.id}
            className={`question-slide ${animate ? "slide-down" : ""} ${isLastQuestion ? "slide-up" : ""}`}
        >
            <div className="question-title">{data.header}</div>

            <div className="question-container">
                <div className="question-box">{data.question}</div>

                {/* <div className="answers-grid">
                    {data.answers.map((ans, index) => {
                        let className = "answer";
                        if (selected === index) className = ans.correct ? "answer correct" : "answer wrong";
                        return (
                            <div key={index} className={className} onClick={() => handleAnswer(ans, index)}>
                                {ans.text}
                            </div>
                        );
                    })}
                </div> */}

                <div className="answers-grid">
                    {data.answers.map((ans, index) => {

                        let bg = BlueAns;

                        if (selected === index) {
                            bg = ans.correct
                                ? GreenAns
                                : RedAns;
                        }

                        return (

                            <div
                                key={index}
                                className="answer"
                                onClick={() => handleAnswer(ans, index)}
                            >

                                <img src={bg} className="answer-bg" alt="answer option" />

                                <span className="answer-text">
                                    {ans.text}
                                </span>

                            </div>

                        )

                    })}
                </div>

                <button
                    className={`continue-btn ${!isCorrect ? "disabled" : ""}`}
                    onClick={isCorrect ? onCorrect : null}
                >
                    המשך
                </button>
            </div>
        </div>
    );
}

export default QuestionSlide;
