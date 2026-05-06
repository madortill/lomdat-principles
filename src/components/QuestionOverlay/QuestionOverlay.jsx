import { useState, useEffect } from "react";
import "./QuestionOverlay.css";
import BlueAns from "../../assets/answer-blue.svg";
import RedAns from "../../assets/answer-red.svg";
import GreenAns from "../../assets/answer-green.svg";

function QuestionSlide({ data, onCorrect, isLastQuestion, wasCompleted }) {
  const [selected, setSelected] = useState([]);
  const [wrongSelected, setWrongSelected] = useState([]); // 👈 חדש
  const [isCorrect, setIsCorrect] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (wasCompleted) {
      const correctIndexes = data.answers
        .map((ans, i) => (ans.correct ? i : null))
        .filter((i) => i !== null);

      setSelected(correctIndexes);
      setIsCorrect(true);
    } else {
      setSelected([]);
      setWrongSelected([]);
      setIsCorrect(false);
    }

    setAnimate(true);
  }, [data.id, wasCompleted]);

  // בדיקת נכונות לשאלות עם 2 תשובות
  useEffect(() => {
    if (data.twoAns) {
      const correctIndexes = data.answers
        .map((a, i) => (a.correct ? i : null))
        .filter((i) => i !== null);

      const isAllCorrect =
        selected.length === correctIndexes.length &&
        selected.every((i) => correctIndexes.includes(i));

      setIsCorrect(isAllCorrect);
    }
  }, [selected, data]);

  function handleAnswer(answer, index) {
    if (isCorrect || wasCompleted) return;

    const ansEl = document.querySelectorAll(".answer")[index];
    if (!ansEl) return;

    ansEl.classList.remove("animate-pop", "animate-shake");
    void ansEl.offsetWidth;

    if (data.twoAns) {
      // ❗ אם זו תשובה לא נכונה → רק להראות אדום זמני
      if (!answer.correct) {
        setWrongSelected([index]);

        ansEl.classList.add("animate-shake");

        // ❗ אחרי רגע האדום נעלם
        setTimeout(() => {
          setWrongSelected([]);
        }, 500);

        return;
      }

      // ✅ תשובה נכונה
      setSelected((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        }

        if (prev.length >= 2) {
          return [prev[1], index];
        }

        return [...prev, index];
      });

      ansEl.classList.add("animate-pop");
    } else {
      // שאלה רגילה
      setSelected([index]);
      setIsCorrect(answer.correct);

      if (answer.correct) {
        ansEl.classList.add("animate-pop");
      } else {
        ansEl.classList.add("animate-shake");
      }
    }
  }

  return (
    <div
      key={data.id}
      className={`question-slide ${animate ? "slide-down" : ""} ${
        isLastQuestion ? "slide-up" : ""
      }`}
    >
      <div className="question-title">{data.header}</div>

      <div className="question-container">
        <div className="question-box">{data.question}</div>

        <div className="answers-grid">
          {data.answers.map((ans, index) => {
            let bg = BlueAns;

            // שאלה רגילה
            if (!data.twoAns && selected.includes(index)) {
              bg = ans.correct ? GreenAns : RedAns;
            }

            // שאלה עם 2 תשובות
            if (data.twoAns && selected.includes(index)) {
              bg = GreenAns;
            }

            // ❗ אדום זמני בלבד
            if (wrongSelected.includes(index)) {
              bg = RedAns;
            }

            return (
              <div
                key={index}
                className={`answer ${
                  isCorrect || wasCompleted ? "locked" : ""
                }`}
                onClick={() => handleAnswer(ans, index)}
              >
                <img src={bg} className="answer-bg" alt="answer option" />
                <span className="answer-text">{ans.text}</span>
              </div>
            );
          })}
        </div>

        <button
          className={`continue-btn-ques ${
            isCorrect || wasCompleted ? "" : "disabled"
          }`}
          onClick={isCorrect || wasCompleted ? onCorrect : null}
        >
          המשך
        </button>
      </div>
    </div>
  );
}

export default QuestionSlide;
