import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileBlocker from "./components/MobileBlocker/MobileBlocker";
import OpeningPage from "./pages/OpeningPage/OpeningPage";
import LearningPage from "./pages/LearningPage/LearningPage";
import EndPage from "./pages/EndPage/EndPage";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkScreen() {
      setIsMobile(window.innerWidth < 900);
    }
    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return <MobileBlocker />;
  }

  return (
      <BrowserRouter basename="/lomdat-principles">
        <Routes>
          <Route path="/" element={<OpeningPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/end" element={<EndPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
