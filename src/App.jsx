// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./Welcome";
import { useRef } from "react";
import starsound from "./assets/starsound.mp3";
import MemoryBook from "./MemoryBook";

function AnimatedRoutes({ audioRef }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome audioRef={audioRef} />} />
        <Route path="/memory-book" element={<MemoryBook />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const audioRef = useRef(null);

  return (
    <Router>
      <audio ref={audioRef} src={starsound} preload="auto" loop />
      <AnimatedRoutes audioRef={audioRef} />
    </Router>
  );
}

export default App;
