import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />}/>
          <Route path="*" element={<Gallery />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
