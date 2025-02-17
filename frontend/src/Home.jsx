// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import airportData from "./airports.json"; // Ensure correct path
// import airplaneAnimation from "./assets/airplane.json"; // Lottie animation
// import "./Home.css"; // Ensure CSS file exists

// Modal.setAppElement("#root");

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [criteria, setCriteria] = useState("");
//   const [airports, setAirports] = useState([]);

//   useEffect(() => {
//     console.log("Loaded Airports:", airportData); // Debugging dropdown issue
//     if (airportData && Array.isArray(airportData)) {
//       setAirports(airportData);
//     } else {
//       console.error("Error loading airports.json. Check file structure.");
//     }
//   }, []);

//   const handleFindRoute = () => {
//     if (!source || !destination) {
//       alert("Please select both source and destination");
//       return;
//     }

//     // Play alert sound (ensure alert.mp3 exists in public/assets/)
//     const audio = new Audio("/assets/alert.mp3");
//     audio.play().catch((err) => console.error("Error playing sound:", err));

//     setIsOpen(true);
//   };

//   const handleSelectCriteria = (selectedCriteria) => {
//     setCriteria(selectedCriteria);
//     setIsOpen(false);

//     // Redirect to results page
//     window.location.href = `/results?source=${source}&destination=${destination}&criteria=${selectedCriteria}`;
//   };

//   return (
//     <div className="home-container">
//       {/* Background */}
//       <div className="background-overlay"></div>

//       {/* Flight Animation */}
//       <div className="airplane-animation">
//         <Lottie animationData={airplaneAnimation} loop={true} />
//       </div>

//       {/* Title */}
//       <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>

//       {/* Selection Container */}
//       <div className="selection-container">
//         <label>Source:</label>
//         <select value={source} onChange={(e) => setSource(e.target.value)}>
//           <option value="">Select an airport</option>
//           {airports.length > 0 ? (
//             airports.map((airport) => (
//               <option key={airport.code} value={airport.name}>
//                 {airport.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>Loading airports...</option>
//           )}
//         </select>

//         <label>Destination:</label>
//         <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//           <option value="">Select an airport</option>
//           {airports.length > 0 ? (
//             airports.map((airport) => (
//               <option key={airport.code} value={airport.name}>
//                 {airport.name}
//               </option>
//             ))
//           ) : (
//             <option disabled>Loading airports...</option>
//           )}
//         </select>
//       </div>

//       {/* Button Section (Separate from Background) */}
//       <div className="button-container">
//         <button className="find-route-button" onClick={handleFindRoute}>
//           Find Best Route
//         </button>
//       </div>

//       {/* Popup Modal */}
//       <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
//         <h2>Select Optimization Criteria</h2>
//         <button onClick={() => handleSelectCriteria("cost")}>Cheapest</button>
//         <button onClick={() => handleSelectCriteria("distance")}>Shortest Distance</button>
//         <button onClick={() => handleSelectCriteria("time")}>Fastest</button>
//       </Modal>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Modal from "react-modal";
import airportData from "./airports.json"; // Ensure correct path
import airplaneAnimation from "./assets/airplane.json"; // Lottie animation
import "./Home.css"; // Ensure CSS file exists

Modal.setAppElement("#root");

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [criteria, setCriteria] = useState("");
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    console.log("Loaded Airports:", airportData);
    if (airportData && Array.isArray(airportData)) {
      setAirports(airportData);
    } else {
      console.error("Error loading airports.json. Check file structure.");
    }
  }, []);

  const handleFindRoute = () => {
    if (!source || !destination) {
      alert("Please select both source and destination");
      return;
    }

    // Play notification sound
    const audio = new Audio("/assets/alert.mp3");
    audio.play().catch((err) => console.error("Error playing sound:", err));

    setIsOpen(true);
  };

  const handleSelectCriteria = (selectedCriteria) => {
    setCriteria(selectedCriteria);
    setIsOpen(false);
    window.location.href = `/results?source=${source}&destination=${destination}&criteria=${selectedCriteria}`;
  };

  return (
    <div className="home-container">
      {/* Background */}
      <div className="background-overlay"></div>

      {/* Flight Animation */}
      <div className="airplane-animation">
        <Lottie animationData={airplaneAnimation} loop={true} />
      </div>

      {/* Title */}
      <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>

      {/* Selection Container */}
      <div className="selection-container">
        <div className="input-group">
          <label>Source:</label>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select an airport</option>
            {airports.length > 0 ? (
              airports.map((airport) => (
                <option key={airport.code} value={airport.name} className="dropdown-option">
                  {airport.name}
                </option>
              ))
            ) : (
              <option disabled>Loading airports...</option>
            )}
          </select>
        </div>

        <div className="input-group">
          <label>Destination:</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select an airport</option>
            {airports.length > 0 ? (
              airports.map((airport) => (
                <option key={airport.code} value={airport.name} className="dropdown-option">
                  {airport.name}
                </option>
              ))
            ) : (
              <option disabled>Loading airports...</option>
            )}
          </select>
        </div>
      </div>

      {/* Button Section */}
      <div className="button-container">
        <button className="find-route-button" onClick={handleFindRoute}>
          Find Best Route
        </button>
      </div>

      {/* Popup Modal */}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
        <h2>Select Optimization Criteria</h2>
        <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
        <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
        <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
      </Modal>
    </div>
  );
};
return the changes ;
export default Home;
