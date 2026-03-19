import { useState } from "react";
import "./VehicleTypesSlide.css";

function VehicleTypesSlide({ data, setIsOverlayOpen }) {
  const [zoomImg, setZoomImg] = useState(null);

  const openZoom = (img) => {
    setZoomImg(img);
    setIsOverlayOpen(true);
  };

  const closeZoom = () => {
    setZoomImg(null);
    setIsOverlayOpen(false);
  };

  return (
    <>
      <div className="vehicle-slide">
        <div className="slide-title">{data.header}</div>

        {data.text && <div className="vehicle-text">{data.text}</div>}

        {data.image && (
          <img
            src={data.image}
            className="rank-image"
            alt=""
          />
        )}

        <div className="vehicles-area">
          <div className={`vehicles-grid vehicles-${data.vehicles.length}`}>
            {data.vehicles.map((vehicle, index) => (
              <div className="vehicle-card" key={index}>
                <p>{vehicle.title}</p>
                
                <div className="vehicle-image-box">
                  <div className="image-inner">
                    <img
                      src={vehicle.image}
                      alt=""
                      className="vehicle-image-box-img"
                      onClick={() => openZoom(vehicle.image)}
                    />
                  </div>

                  {vehicle.badge && (
                    <img
                      src={vehicle.badge}
                      className="vehicle-badge"
                      onClick={() => openZoom(vehicle.image)}
                    />
                  )}

                  {vehicle.extraImage && (
                    <img
                      src={vehicle.extraImage}
                      className="vehicle-extra"
                      onClick={() => openZoom(vehicle.image)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {zoomImg && (
          <div className="image-zoom-overlay" onClick={closeZoom}>
            <img src={zoomImg} className="image-zoom" />
          </div>
        )}
      </div>
    </>
  );
}

export default VehicleTypesSlide;
