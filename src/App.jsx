import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroSlide from "./components/IntroSlide";
import RevealGallery from "./components/RevealGallery";
import WrappedStats from "./components/WrappedStats"
import FinalMessage from "./components/FinalMessage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroSlide />} />
        <Route path="/gallery" element={<RevealGallery />} />
        <Route path="/next" element={<WrappedStats />} />
        <Route path="/end" element={<FinalMessage />} />
      </Routes>
    </Router>
  );
}

export default App;
