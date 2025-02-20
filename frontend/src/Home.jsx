
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
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
//   const [routeResult, setRouteResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAirports = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/airports");
//         console.log("API Response:", response.data);

//         if (response.data.length > 0) {
//           setAirports(response.data);
//         } else {
//           setError("No airport data available.");
//         }
//       } catch (error) {
//         console.error("Error fetching airport data:", error);
//         setError("Failed to load airport data.");
//       }
//     };

//     fetchAirports();
//   }, []);

//   const handleFindRoute = async () => {
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
//     setRouteResult(null);

//     try {
//       const response = await axios.post("http://localhost:5000/api/find-route", {
//         source,
//         destination,
//         criteria,
//       });

//       console.log("Route Response:", response.data);

//       if (response.data.route) {
//         setRouteResult(response.data.route);
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
//         <button onClick={() => fetchOptimizedRoute("fastest")}>⏳ Fastest</button>
//       </Modal>

//       <div className="result-container">
//         {loading && <p>Finding best route...</p>}
//         {error && <p className="error">{error}</p>}
//         {routeResult && (
//           <div className="route-result">
//             <h2>Best Route Found:</h2>
//             <p><strong>Path:</strong> {routeResult.path?.join(" → ") || "N/A"}</p>
//             <p><strong>Distance:</strong> {routeResult.distance ?? "N/A"} km</p>
//             <p><strong>Estimated Time:</strong> {routeResult.time ? `${routeResult.time} hours` : "N/A"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
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
//         const response = await axios.get("http://localhost:5000/api/airports");
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
//       const response = await axios.post("http://localhost:5000/api/find-route", {
//         source,
//         destination,
//         criteria,
//       });

//       if (response.data.route) {
//         navigate("/results", { state: { 
//           source, 
//           destination, 
//           route: response.data.route.path, 
//           distance: response.data.route.distance, 
//           time: response.data.route.time 
//         }}); // Navigate to Results.jsx with route details
//       } else {
//         setError("No route found. Try another selection.");
//       }
//     } catch (error) {
//       setError("Error fetching route. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
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
//         <button onClick={() => fetchOptimizedRoute("fastest")}>⏳ Fastest</button>
//       </Modal>

//       <div className="result-container">
//         {loading && <p>Finding best route...</p>}
//         {error && <p className="error">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
        const response = await axios.get("http://localhost:5000/api/airports");
        if (response.data.length > 0) {
          setAirports(response.data);
        } else {
          setError("No airport data available.");
        }
      } catch (error) {
        setError("Failed to load airport data.");
      }
    };

    fetchAirports();
  }, []);

  const handleFindRoute = () => {
    if (!source || !destination) {
      alert("Please select both source and destination");
      return;
    }

    const audio = new Audio("/alert.mp3");
    audio.play().catch((err) => console.error("Error playing sound:", err));

    setIsOpen(true);
  };

  const fetchOptimizedRoute = async (criteria) => {
    setIsOpen(false);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/find-route", {
        source,
        destination,
        criteria,
      });

      console.log("API Response:", response.data); // Debugging log

      // ✅ Fix: Corrected response handling
      if (response.data && response.data.path) {
        navigate("/results", {
          state: {
            source,
            destination,
            route: response.data.path, // ✅ Corrected
            distance: response.data.distance,
            time: response.data.time,
          },
        });
      } else {
        setError("No route found. Try another selection.");
      }
    } catch (error) {
      setError("Error fetching route. Please try again.");
      console.error("Error fetching route:", error);
    }

    setLoading(false);
  };

  return (
    <div div className="home-page">
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
        <button className="find-route-button" onClick={handleFindRoute}>
          Find Best Route
        </button>
      </div>

      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
        <h2>Select Optimization Criteria</h2>
        <button onClick={() => fetchOptimizedRoute("shortest")}>📏 Shortest Distance</button>
        <button onClick={() => fetchOptimizedRoute("fastest")}>⏳ Fastest</button>
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


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import axios from "axios";
// import airplaneAnimation from "./assets/airplane.json";
// import "./Home.css";

// Modal.setAppElement("#root");

// const Home = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");
//     const [airports, setAirports] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchAirports = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/airports");
//                 if (response.data.length > 0) {
//                     setAirports(response.data);
//                 } else {
//                     setError("No airport data available.");
//                 }
//             } catch (error) {
//                 setError("Failed to load airport data.");
//             }
//         };

//         fetchAirports();
//     }, []);

//     const handleFindRoute = () => {
//         if (!source || !destination) {
//             alert("Please select both source and destination");
//             return;
//         }

//         const audio = new Audio("/alert.mp3");
//         audio.play().catch((err) => console.error("Error playing sound:", err));

//         setIsOpen(true);
//     };

//     const fetchOptimizedRoute = async (criteria) => {
//         setIsOpen(false);
//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.post("http://localhost:5000/api/find-route", {
//                 source,
//                 destination,
//                 criteria,
//             });

//             if (response.data && response.data.path) {
//                 navigate("/results", {
//                     state: {
//                         source,
//                         destination,
//                         route: response.data.path,
//                         distance: response.data.distance,
//                         time: response.data.time,
//                     },
//                 });
//             } else {
//                 setError("No route found. Try another selection.");
//             }
//         } catch (error) {
//             setError("Error fetching route. Please try again.");
//             console.error("Error fetching route:", error);
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="home-container">
//             <div className="content">
//                 <h1 className="title">Welcome to Flight Route Optimizer ✈</h1>

//                 <div className="airplane-animation">
//                     <Lottie animationData={airplaneAnimation} loop={true} />
//                 </div>

//                 <div className="selection-container">
//                     <div className="input-group">
//                         <label>Source:</label>
//                         <select value={source} onChange={(e) => setSource(e.target.value)}>
//                             <option value="">Select an airport</option>
//                             {airports.map((airport) => (
//                                 <option key={airport._id} value={airport.iata}>
//                                     {airport.name} ({airport.iata})
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="input-group">
//                         <label>Destination:</label>
//                         <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//                             <option value="">Select an airport</option>
//                             {airports.map((airport) => (
//                                 <option key={airport._id} value={airport.iata}>
//                                     {airport.name} ({airport.iata})
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <button className="find-route-button" onClick={handleFindRoute}>
//                     Find Best Route
//                 </button>

//                 <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className="modal">
//                     <h2>Select Optimization Criteria</h2>
//                     <button onClick={() => fetchOptimizedRoute("shortest")}>📏 Shortest Distance</button>
//                     <button onClick={() => fetchOptimizedRoute("fastest")}>⏳ Fastest</button>
//                 </Modal>

//                 {loading && <p>Finding best route...</p>}
//                 {error && <p className="error">{error}</p>}
//             </div>
//         </div>
//     );
// };

// export default Home;
