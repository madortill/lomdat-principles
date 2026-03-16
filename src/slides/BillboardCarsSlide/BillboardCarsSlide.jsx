import { useState, useEffect } from "react";
import LightingPole from "../../assets/LightingPole.svg";
import "./BillboardCarsSlide.css"

function BillboardCarsSlide({ data, unlock }) {

    const [active, setActive] = useState(null)
    const [seen, setSeen] = useState([])

    const selectCar = (index) => {

        setActive(index)

        if (!seen.includes(index)) {

            const updated = [...seen, index]
            setSeen(updated)

            if (updated.length === data.cars.length) {
                unlock()
            }

        }

    }

    return (

        <div className="billboard-slide">

            <div className="slide-title">{data.header}</div>

            <div className="billboard-structure">

                <div className={`billboard ${active !== null ? "lit" : ""}`}>
                    {active === null ? (

                        <div className="billboard-start">
                            {data.text}
                        </div>

                    ) : (

                        <>
                            <div className="billboard-title">
                                {data.cars[active].title}
                            </div>

                            {/* <div className="billboard-text">
                                {data.cars[active].text}
                            </div> */}
                            <div className="billboard-text">

                                {data.cars[active].text.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}

                            </div>
                        </>

                    )}
                </div>

                <div className="billboard-pole"></div>

            </div>

            <div className="road-area">

                {/* <img src={LightingPole} className="lamp" /> */}

                <div className="cars-billboard">

                    {data.cars.map((car, index) => (
                        <div
                            key={index}
                            className={`car-box ${active === index ? "active" : ""}`}
                            onClick={() => selectCar(index)}
                        >

                            {seen.includes(index) && <div className="check-billboard">✔</div>}

                            <img src={car.img} className="car-img-billboard" />

                        </div>
                    ))}

                </div>

            </div>

        </div>

    )

}

export default BillboardCarsSlide;
