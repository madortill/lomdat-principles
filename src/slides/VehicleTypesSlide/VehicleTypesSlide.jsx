import "./VehicleTypesSlide.css";

function VehicleTypesSlide({ data }) {

    return (
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
                />
            )}

            <div className="vehicles-grid">

                {data.vehicles.map((vehicle, index) => (

                    <div className="vehicle-card" key={index}>

                        <img src={vehicle.image} alt="" />

                        <p>{vehicle.title}</p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default VehicleTypesSlide;