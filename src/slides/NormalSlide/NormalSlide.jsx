import "./NormalSlide.css";

function NormalSlide({ data }) {
  return (
    <div className="normal-slide">
      <h2>{data.header}</h2>
      <div className="normal-slide-header">{data.header2}</div>
      <div className="normal-slide-header">{data.header3}</div>

      <p>{data.text}</p>

      <div className="imgs-normal-slide">
        {data.image && <img src={data.image} className="slide-image" />}
        {data.image2 && <img src={data.image2} className="slide-image" />}
      </div>
    </div>
  );
}

export default NormalSlide;
