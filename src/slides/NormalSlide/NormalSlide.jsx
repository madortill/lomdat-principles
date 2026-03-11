import "./NormalSlide.css"

function NormalSlide({ data }) {

    return (
        <div className="normal-slide">

            <h2>{data.header}</h2>

            <p>{data.text}</p>

            {data.image && (
                <img src={data.image} className="slide-image"/>
            )}

        </div>
    );
}

export default NormalSlide;