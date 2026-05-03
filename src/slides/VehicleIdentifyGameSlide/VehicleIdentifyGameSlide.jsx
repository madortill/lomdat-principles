import { useState } from "react";
import "./VehicleIdentifyGameSlide.css";
import cactus from "../../assets/cactus.svg";
import tillBlackLogo from "../../assets/till_blacklogo.svg";

function VehicleGameSlide({ data, unlock, goBack }) {

    const [started, setStarted] = useState(false)
    const [current, setCurrent] = useState(0)
    const [result, setResult] = useState(null)
    const [finished, setFinished] = useState(false)
    const [selected, setSelected] = useState(null)

    const question = data.questions[current]

    const chooseCar = (index) => {
        if (result) return

        setSelected(index)

        const correct = question.correct === index

        setResult(correct ? "correct" : "wrong")

        setTimeout(() => {
            if (current < data.questions.length - 1) {
                setCurrent(current + 1)
                setResult(null)
                setSelected(null)
            } else {
                setFinished(true)
            }
        }, 1800)
    }

    return (

        <div className="vehicle-game-slide">
            <img src={tillBlackLogo} alt="till logo" className="till-logo-black-end-page" />

            {/* מסך פתיחה */}

            {!started && (

                <div className="game-intro">

                    <h2 className="slide-title title-game">{data.header}</h2>

                    <div className="intro-text">{data.introText}</div>

                    <div className="btns-cars-practice">
                        <button
                            className="back-to-learning"
                            onClick={goBack}
                        >
                            הקודם
                        </button>

                        <button
                            className="start-btn-cars"
                            onClick={() => setStarted(true)}
                        >
                            {data.startButton}
                        </button>
                    </div>

                </div>

            )}

            {/* אזור המשחק */}

            <>

                {started && !finished && (
                    <>
                        <h2 className="slide-title title-game">{data.header}</h2>

                        <p className="game-question">
                            {question.question}
                        </p>
                    </>
                )}

                <img src={cactus} className="cactus cactus-left" />
                <img src={cactus} className="cactus cactus-right" />

                <div className="road-wrapper">

                    {/* <div className="road-shoulder left"></div> */}
                    {/* <div className="road-shoulder right"></div> */}
                    <div className="road-car-practice">
                        <div className="road-lines"></div>
                    </div>
                    {started && !finished && (
                        <div className="cars">
                            {question.cars.map((car, index) => {
                                let className = "game-car"
                                if (selected === index) {
                                    if (result === "correct") {
                                        className += " correct"
                                    } else if (result === "wrong") {
                                        className += " wrong"
                                    }
                                }

                                return (
                                    <img
                                        key={index}
                                        src={car.image}
                                        className={className}
                                        onClick={() => chooseCar(index)}
                                        alt=""
                                    />
                                )

                            })}

                        </div>
                    )}
                </div>

                {result === "correct" && (
                    <div className="feedback correct-text">
                        כל הכבוד!
                    </div>
                )}

                {result === "wrong" && (
                    <div className="feedback wrong-text">
                        לא נכון
                    </div>
                )}

            </>

            {/* פופאפ סיום */}

            {finished && (

                <div className="game-finish-overlay">

                    <div className="game-finish-popup">

                        <h2>כל הכבוד סיימתם את זיהוי הרכבים!</h2>

                        <p>בואו נמשיך ללמוד :)</p>

                        <button
                            className="continue-btn"
                            onClick={unlock}
                        >
                            המשך ללמידה
                        </button>

                    </div>

                </div>

            )}

        </div>

    )

}

export default VehicleGameSlide