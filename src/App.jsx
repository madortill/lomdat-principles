// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState, useEffect } from "react";
// import MobileBlocker from "./components/MobileBlocker/MobileBlocker";
// import OpeningPage from "./pages/OpeningPage/OpeningPage";
// import LearningPage from "./pages/LearningPage/LearningPage";
// import LearningPage2 from "./pages/LearningPage2/LearningPage2";
// import EndPage from "./pages/EndPage/EndPage";
// import "./App.css";

// function App() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     function checkScreen() {
//       setIsMobile(window.innerWidth < 900);
//     }
//     checkScreen();

//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   // נתונים של פרק 1
//   const [ch1Progress, setCh1Progress] = useState({
//     currentSlide: 0,
//     maxVisited: 0,
//     completed: {},
//   });

//   // נתונים של פרק 2
//   const [ch2Progress, setCh2Progress] = useState({
//     currentSlide: 0,
//     maxVisited: 0,
//     completed: {},
//   });

//   if (isMobile) {
//     return <MobileBlocker />;
//   }

//   return (
//     <BrowserRouter basename="/lomdat-principles">
//       <Routes>
//         <Route path="/" element={<OpeningPage />} />
//         <Route
//           path="/learning"
//           element={
//             <LearningPage progress={ch1Progress} setProgress={setCh1Progress} />
//           }
//         />
//         <Route
//           path="/learning2"
//           element={
//             <LearningPage2
//               progress={ch2Progress}
//               setProgress={setCh2Progress}
//               ch1Max={ch1Progress.maxVisited}
//             />
//           }
//         />
//         <Route path="/end" element={<EndPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileBlocker from "./components/MobileBlocker/MobileBlocker";
import OpeningPage from "./pages/OpeningPage/OpeningPage";
import LearningPage from "./pages/LearningPage/LearningPage";
import LearningPage2 from "./pages/LearningPage2/LearningPage2";
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

  // נתונים של פרק 1
  const [ch1Progress, setCh1Progress] = useState({
    currentSlide: 0,
    maxVisited: 0,
    completed: {},
  });

  // נתונים של פרק 2
  const [ch2Progress, setCh2Progress] = useState({
    currentSlide: 0,
    maxVisited: 0,
    completed: {},
  });

  if (isMobile) {
    return <MobileBlocker />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route
          path="/learning"
          element={
            <LearningPage progress={ch1Progress} setProgress={setCh1Progress} />
          }
        />
        <Route
          path="/learning2"
          element={
            <LearningPage2
              progress={ch2Progress}
              setProgress={setCh2Progress}
              ch1Max={ch1Progress.maxVisited}
            />
          }
        />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
