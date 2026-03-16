import "./RoadSign.css"

function RoadSign({ data }) {

    return (

        <div className="road-scene-sign">

            <h2>{data.header}</h2>

            <div className="scene-layout">

                {/* שלט */}
                <div className="sign">

                    <div className="content-border">

                        <div className="text1-sign">
                            <img src={data.img1} className="img1-sign" />
                            <div className="text-sign">{data.text1}</div>
                        </div>

                        <div className="text2-sign">
                            <img src={data.img2} className="img2-sign" />
                            <div className="text-sign">{data.text2}</div>
                        </div>

                        <div className="text3-sign">
                            <div className="text-sign">{data.text3}</div>
                        </div>

                    </div>

                    <div className="sign-legs"></div>

                </div>

                {/* מנורה */}
                <img src={data.image} className="street-lamp" />

            </div>

            {/* הכביש */}
            <div className="road-sign"></div>

        </div>
    )
}

export default RoadSign