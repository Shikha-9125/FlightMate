import {  Routes, Route } from "react-router-dom";
import Home from "./Home";
import Results from "./Results"; // Assuming you have a Results component

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>

  );
}

export default App;
