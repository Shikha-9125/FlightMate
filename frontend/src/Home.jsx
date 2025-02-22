
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import axios from "axios";
// import airplaneAnimation from "./assets/airplane.json";
// import "./Home.css";

// Modal.setAppElement("#root");

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [airports, setAirports] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate(); // Initialize navigation

//   useEffect(() => {
//     const fetchAirports = async () => {
//       try {
//         const response = await axios.get(
//           `{process.env.REACT_APP_API_URL}/api/airports`
//         if (response.data.length > 0) {
//           setAirports(response.data);
//         } else {
//           setError("No airport data available.");
//         }
//       } catch (error) {
//         setError("Failed to load airport data.");
//       }
//     };

//     fetchAirports();
//   }, []);

//   const handleFindRoute = () => {
//     if (!source || !destination) {
//       alert("Please select both source and destination");
//       return;
//     }

//     const audio = new Audio("/alert.mp3");
//     audio.play().catch((err) => console.error("Error playing sound:", err));

//     setIsOpen(true);
//   };
//   const fetchOptimizedRoute = async (criteria) => {
//     setIsOpen(false);
//     setLoading(true);
//     setError("");
  
//     try {
//       const response = await axios.post("https://flightmate-hn8i.onrender.com/api/airports", {
//         source,
//         destination,
//         criteria,
//       });
  
//       console.log("API Response:", response.data); // Debugging log
  
//       if (response.data) {
//         navigate("/results", {
//           state: {
//             source,
//             destination,
//             directDistance: response.data.directDistance, // "No direct flight"
//             shortestPath: response.data.shortestPath, // Route array
//             shortestDistance: response.data.shortestDistance, // Distance value
//           },
//         });
//       } else {
//         setError("No route found. Try another selection.");
//       }
//     } catch (error) {
//       setError("Error fetching route. Please try again.");
//       console.error("Error fetching route:", error);
//     }
  
//     setLoading(false);
//   };
  

//   return (
//     <div className="home-page">
//     <div className="home-container">
//       <div className="background-overlay"></div>
//       <div className="airplane-animation">
//         <Lottie animationData={airplaneAnimation} loop={true} />
//       </div>
//       <h1 className="title">Welcome to Flight Route Optimizer ✈</h1>

//       <div className="selection-container">
//         <div className="input-group">
//           <label>Source:</label>
//           <select value={source} onChange={(e) => setSource(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.map((airport) => (
//               <option key={airport._id} value={airport.iata}>
//                 {airport.name} ({airport.iata})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="input-group">
//           <label>Destination:</label>
//           <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.map((airport) => (
//               <option key={airport._id} value={airport.iata}>
//                 {airport.name} ({airport.iata})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="button-container">
//         <button className="find-route-button" onClick={handleFindRoute}>
//           Find Best Route
//         </button>
//       </div>

//       <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
//         <h2>Select Optimization Criteria</h2>
//         <button onClick={() => fetchOptimizedRoute("shortest")}>📏 Shortest Distance</button>
//       </Modal>

//       <div className="result-container">
//         {loading && <p>Finding best route...</p>}
//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Modal from "react-modal";
import axios from "axios";
import airplaneAnimation from "./assets/airplane.json";
import "./Home.css";

Modal.setAppElement("#root");

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL; // ✅ Correct way for Vite
        if (!API_URL) throw new Error("API URL is missing in .env");

        console.log("Fetching data from:", API_URL);

        const response = await axios.get(`${API_URL}/api/airports`);

        if (response.data.length > 0) {
          setAirports(response.data);
        } else {
          setError("No airport data available.");
        }
      } catch (error) {
        setError("Failed to load airport data.");
        console.error("API Error:", error);
      }
    };

    fetchAirports();
  }, []);

  const fetchOptimizedRoute = async (criteria) => {
    setIsOpen(false);
    setLoading(true);
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL; // ✅ Correct way for Vite
      if (!API_URL) throw new Error("API URL is missing in .env");

      const response = await axios.post(
        `${API_URL}/api/routes`, // ✅ Use Vite variable
        { source, destination, criteria },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.shortestPath) {
        navigate("/results", {
          state: {
            source,
            destination,
            directDistance: response.data.directDistance || "No direct flight",
            shortestPath: response.data.shortestPath,
            shortestDistance: response.data.shortestDistance,
          },
        });
      } else {
        setError("No route found. Try another selection.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching route.");
      console.error("Error fetching route:", error);
    }

    setLoading(false);
  };

  return (
    <div className="home-page">
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
              {airports.map((airport) => (
                <option key={airport._id} value={airport.iata}>
                  {airport.name} ({airport.iata})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Destination:</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">Select an airport</option>
              {airports.map((airport) => (
                <option key={airport._id} value={airport.iata}>
                  {airport.name} ({airport.iata})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="button-container">
          <button className="find-route-button" onClick={() => setIsOpen(true)}>
            Find Best Route
          </button>
        </div>

        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
          <h2>Select Optimization Criteria</h2>
          <button onClick={() => fetchOptimizedRoute("shortest")}>📏 Shortest Distance</button>
        </Modal>

        <div className="result-container">
          {loading && <p>Finding best route...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
