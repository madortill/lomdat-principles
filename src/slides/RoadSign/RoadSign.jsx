import "./RoadSign.css"

function RoadSign({ data }) {

    return (
        <div className="road-sign-slide">

            <h2>{data.header}</h2>

            <div className="content-sign" >
                <div className="content-border" >
                    <div className="text1-sign" >
                        <img src={data.img1} alt="" className="img1-sign" />
                        <div className="text-sign" >{data.text1}</div>
                    </div>
                    <div className="text2-sign" >
                        <img src={data.img2} alt="" className="img2-sign" />
                        <div className="text-sign" >{data.text2}</div>
                    </div>
                    <div className="text3-sign" >
                        <div className="text-sign" >{data.text3}</div>
                    </div>
                </div>
            </div>

            {data.image && (
                <img src={data.image} className="sign-image" />
            )}

        </div>
    );
}

export default RoadSign;