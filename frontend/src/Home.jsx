
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Modal from "react-modal";
import axios from "axios"; // ✅ Imported Axios
import airplaneAnimation from "./assets/airplane.json";
import "./Home.css";

Modal.setAppElement("#root");

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [airports, setAirports] = useState([]);

  // Fetch airport data from backend
  const fetchAirports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/airports");
      console.log("API Response:", response.data); // ✅ Log the API response

      if (response.data && response.data.length > 0) {
        setAirports(response.data);
      } else {
        console.error("Error: No airport data available");
      }
    } catch (error) {
      console.error("Error fetching airport data:", error);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  // Handle route finding logic
  const handleFindRoute = async () => {
    if (!source || !destination) {
      alert("Please select both source and destination");
      return;
    }

    // Play alert sound
    const audio = new Audio("/alert.mp3");
    audio.play().catch((err) => console.error("Error playing sound:", err));

    // Open modal for optimization criteria
    setIsOpen(true);
  };

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      <div className="airplane-animation">
        <Lottie animationData={airplaneAnimation} loop={true} />
      </div>
      <h1 className="title">Welcome to Flight Route Optimizer ✈</h1>
      <div className="selection-container">
        <div className="input-group">
          <label>Source:</label>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select an airport</option>
            {airports.length > 0 ? (
              airports.map((airport) => (
                <option key={airport._id} value={airport.iata}>
                  {airport.name} ({airport.iata})
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
                <option key={airport._id} value={airport.iata}>
                  {airport.name} ({airport.iata})
                </option>
              ))
            ) : (
              <option disabled>Loading airports...</option>
            )}
          </select>
        </div>
      </div>
      <div className="button-container">
        <button className="find-route-button" onClick={handleFindRoute}>
          Find Best Route
        </button>
      </div>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
        <h2>Select Optimization Criteria</h2>
        <button onClick={() => alert("Shortest distance option is not yet implemented")}>
          📏 Shortest Distance
        </button>
        <button onClick={() => alert("Fastest option is not yet implemented")}>⏳ Fastest</button>
      </Modal>
    </div>
  );
};

export default Home;
