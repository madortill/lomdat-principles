// import React from "react";
// import { useState } from "react";
// import "./css/App.css";

// function App() {

//   return (
//     <>
//       <div className="app">
//       hello!
//       <img src="./vite.svg" alt="vite" />
//       </div>
//     </>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from "react-router-dom";
import OpeningPage from "./pages/OpeningPage/OpeningPage";
import LearningPage from "./pages/LearningPage/LearningPage";
// import EndPage from "./pages/EndPage/EndPage";
import "./App.css"

function App() {
  return (
    <BrowserRouter basename="/lomdat-principles">
      <Routes>
        <Route path="/" element={<OpeningPage />} />
        <Route path="/learning" element={<LearningPage />} />
        {/* <Route path="/end" element={<EndPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;