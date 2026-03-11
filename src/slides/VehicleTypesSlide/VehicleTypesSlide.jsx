import { useState } from "react";
import "./VehicleTypesSlide.css";

function VehicleTypesSlide({ data }) {

    const [zoomImg, setZoomImg] = useState(null);

    return (
        <>
            <div className="vehicle-slide">

                <div className="slide-title">{data.header}</div>

                {data.text && (
                    <div className="vehicle-text">{data.text}</div>
                )}

                {data.image && (
                    <img
                        src={data.image}
                        className="rank-image"
                        alt=""
                        onClick={() => setZoomImg(data.image)}
                    />
                )}

                <div className={`vehicles-grid vehicles-${data.vehicles.length}`}>

                    {data.vehicles.map((vehicle, index) => (

                        <div className="vehicle-card" key={index}>

                            <p>{vehicle.title}</p>

                            <img
                                src={vehicle.image}
                                alt=""
                                onClick={() => setZoomImg(vehicle.image)}
                            />

                        </div>

                    ))}

                </div>

                {zoomImg && (

                    <div
                        className="image-zoom-overlay"
                        onClick={() => setZoomImg(null)}
                    >

                        <img
                            src={zoomImg}
                            className="image-zoom"
                        />

                    </div>

                )}

            </div>
        </>

    );

}

export default VehicleTypesSlide;