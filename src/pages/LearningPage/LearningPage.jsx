import { useState } from "react";
import slides from "../../data/slides.json";

function LearningPage() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="learning-page">

      <h2>Learning Page</h2>

      <p>Slide: {currentSlide + 1}</p>

      <button onClick={prevSlide}>חזור</button>
      <button onClick={nextSlide}>הבא</button>

    </div>
  );
}

export default LearningPage;