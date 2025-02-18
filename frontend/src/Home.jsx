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
//     console.log("Loaded Airports:", airportData);
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
  
//     // Play notification sound when the modal opens
//     const audio = new Audio("/alert.mp3"); // Ensure it's in the public folder
//     audio.play().catch((err) => console.error("Error playing sound:", err));
  
//     setIsOpen(true);
//   };
  

//   const handleSelectCriteria = (selectedCriteria) => {
//     setCriteria(selectedCriteria);
//     setIsOpen(false);
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
//         <div className="input-group">
//           <label>Source:</label>
//           <select value={source} onChange={(e) => setSource(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.code} value={airport.name} className="dropdown-option">
//                   {airport.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
//           </select>
//         </div>

//         <div className="input-group">
//           <label>Destination:</label>
//           <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.code} value={airport.name} className="dropdown-option">
//                   {airport.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
//           </select>
//         </div>
//       </div>

//       {/* Button Section */}
//       <div className="button-container">
//         <button className="find-route-button" onClick={handleFindRoute}>
//           Find Best Route
//         </button>
//       </div>

//       {/* Popup Modal */}
//       <Modal 
//   isOpen={isOpen} 
//   onRequestClose={() => setIsOpen(false)} 
//   className={`modal ${isOpen ? "modal-enter-active" : "modal-enter"}`} 
// >
//   <h2>Select Optimization Criteria</h2>
//   <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
//   <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
//   <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
// </Modal>

//     </div>
//   );
// };
// export default Home;
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import airplaneAnimation from "./assets/airplane.json";
// import "./Home.css";

// Modal.setAppElement("#root");

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [criteria, setCriteria] = useState("");
//   const [airports, setAirports] = useState([]);

//   const API_KEY = import.meta.env.VITE_AVIATIONSTACK_API_KEY;

//   useEffect(() => {
//     const fetchAirports = async () => {
//       try {
//         const response = await fetch(
//           `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`
//         );
//         const data = await response.json();
//         if (data && data.data) {
//           setAirports(data.data);
//         } else {
//           console.error("Error: No airport data available");
//         }
//       } catch (error) {
//         console.error("Error fetching airport data:", error);
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

//   const handleSelectCriteria = (selectedCriteria) => {
//     setCriteria(selectedCriteria);
//     setIsOpen(false);
//     window.location.href = `/results?source=${source}&destination=${destination}&criteria=${selectedCriteria}`;
//   };

//   return (
//     <div className="home-container">
//       <div className="background-overlay"></div>
//       <div className="airplane-animation">
//         <Lottie animationData={airplaneAnimation} loop={true} />
//       </div>
//       <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>
//       <div className="selection-container">
//         <div className="input-group">
//           <label>Source:</label>
//           <select value={source} onChange={(e) => setSource(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.iata_code} value={airport.name}>
//                   {airport.name} ({airport.iata_code})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
//           </select>
//         </div>
//         <div className="input-group">
//           <label>Destination:</label>
//           <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.name} value={airport.iata_code}>
//                   {airport.iata_code} ({airport.name})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
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
//         <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
//         <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
//         <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
//       </Modal>
//     </div>
//   );
// };

// export default Home;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import airplaneAnimation from "./assets/airplane.json";
// import "./Home.css";

// Modal.setAppElement("#root");

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [criteria, setCriteria] = useState("");
//   const [airports, setAirports] = useState([]);

//   // You can remove the AviationStack API key from here because we are fetching from the backend now
//   const fetchAirports = async () => {
//     try {
//       // Fetching data from your backend
//       const response = await fetch("http://localhost:5000/api/airports");
//       const data = await response.json();
//       if (data && data.length > 0) {
//         setAirports(data);
//       } else {
//         console.error("Error: No airport data available");
//       }
//     } catch (error) {
//       console.error("Error fetching airport data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAirports();
//   }, []); // Fetching airports once when the component mounts

//   const handleFindRoute = async () => {
//     // Check if source and destination are selected
//     if (!source || !destination) {
//       alert("Please select both source and destination");
//       return; // Prevent further execution if validation fails
//     }
  
//     // Play alert sound
//     const audio = new Audio("/alert.mp3");
//     audio.play().catch((err) => console.error("Error playing sound:", err));
  
//     // Open the modal for optimization criteria selection
//     setIsOpen(true);
  
//     // Fetch optimized route data only after validation
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/route?source=${source}&destination=${destination}&criteria=${criteria}`
//       );
//       const data = await response.json();
  
//       // If there's any error from the backend, show it
//       if (data.error) {
//         alert(data.error);
//       } else {
//         alert(`Optimized Route: Distance - ${data.distance}, Time - ${data.duration}`);
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//     }
//   };
  

//   const handleSelectCriteria = (selectedCriteria) => {
//     setCriteria(selectedCriteria);
//     setIsOpen(false);
//     window.location.href = `/results?source=${source}&destination=${destination}&criteria=${selectedCriteria}`;
//   };

//   return (
//     <div className="home-container">
//       <div className="background-overlay"></div>
//       <div className="airplane-animation">
//         <Lottie animationData={airplaneAnimation} loop={true} />
//       </div>
//       <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>
//       <div className="selection-container">
//         <div className="input-group">
//           <label>Source:</label>
//           <select value={source} onChange={(e) => setSource(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.iata_code} value={airport.iata_code}>
//                   {airport.name} ({airport.iata_code})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
//           </select>
//         </div>
//         <div className="input-group">
//           <label>Destination:</label>
//           <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.iata_code} value={airport.iata_code}>
//                   {airport.iata_code} ({airport.name})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
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
//         <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
//         <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
//         <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
//       </Modal>
//     </div>
//   );
// };

// export default Home;
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Lottie from "lottie-react";
// import Modal from "react-modal";
// import airplaneAnimation from "./assets/airplane.json";
// import "./Home.css";

// Modal.setAppElement("#root");

// const Home = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [criteria, setCriteria] = useState("");
//   const [airports, setAirports] = useState([]);

//   // Fetch airport data from backend
//   const fetchAirports = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/airports");
//       const data = await response.json();
//       if (data && data.length > 0) {
//         setAirports(data);
//       } else {
//         console.error("Error: No airport data available");
//       }
//     } catch (error) {
//       console.error("Error fetching airport data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAirports();
//   }, []); // Fetching airports once when the component mounts

//   // Handle route finding logic
//   const handleFindRoute = async () => {
//     if (!source || !destination) {
//       alert("Please select both source and destination");
//       return;
//     }

//     // Play alert sound
//     const audio = new Audio("/alert.mp3");
//     audio.play().catch((err) => console.error("Error playing sound:", err));

//     // Open modal for optimization criteria
//     setIsOpen(true);
//   };

//   // Handle the selection of optimization criteria
//   const handleSelectCriteria = (selectedCriteria) => {
//     setCriteria(selectedCriteria);
//     setIsOpen(false);

//     // Call backend to fetch the route with the selected criteria
//     fetchRoute(selectedCriteria);
//   };

//   // Fetch the route from backend with selected criteria
//   const fetchRoute = async (selectedCriteria) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/route?source=${source}&destination=${destination}&criteria=${selectedCriteria}`
//       );
//       const data = await response.json();

//       if (data.error) {
//         alert(data.error);
//       } else {
//         alert(`Optimized Route: Distance - ${data.distance}, Time - ${data.duration}`);
//       }
//     } catch (error) {
//       console.error("Error fetching route:", error);
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="background-overlay"></div>
//       <div className="airplane-animation">
//         <Lottie animationData={airplaneAnimation} loop={true} />
//       </div>
//       <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>
//       <div className="selection-container">
//         <div className="input-group">
//           <label>Source:</label>
//           <select value={source} onChange={(e) => setSource(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.iata_code} value={airport.iata_code}>
//                   {airport.name} ({airport.iata_code})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
//           </select>
//         </div>
//         <div className="input-group">
//           <label>Destination:</label>
//           <select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             <option value="">Select an airport</option>
//             {airports.length > 0 ? (
//               airports.map((airport) => (
//                 <option key={airport.iata_code} value={airport.iata_code}>
//                   {airport.iata_code} ({airport.name})
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading airports...</option>
//             )}
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
//         <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
//         <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
//         <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
//       </Modal>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Modal from "react-modal";
import airplaneAnimation from "./assets/airplane.json";
import MapContainer from "./MapContainer"; // Import the MapContainer
import "./Home.css";

Modal.setAppElement("#root");

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [criteria, setCriteria] = useState("");
  const [airports, setAirports] = useState([]);
  const [routeData, setRouteData] = useState(null); // Store the route data for displaying on map

  // Fetch airport data from backend
  const fetchAirports = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/airports");
      const data = await response.json();
      if (data && data.length > 0) {
        setAirports(data);
      } else {
        console.error("Error: No airport data available");
      }
    } catch (error) {
      console.error("Error fetching airport data:", error);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []); // Fetching airports once when the component mounts

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

  // Handle the selection of optimization criteria
  const handleSelectCriteria = (selectedCriteria) => {
    setCriteria(selectedCriteria);
    setIsOpen(false);

    // Call backend to fetch the route with the selected criteria
    fetchRoute(selectedCriteria);
  };

  // Fetch the route from backend with selected criteria
  const fetchRoute = async (selectedCriteria) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/route?source=${source}&destination=${destination}&criteria=${selectedCriteria}`
      );
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        setRouteData({
          source,
          destination,
          route: data.steps, // Store the steps for the route to render
        });
        alert(`Optimized Route: Distance - ${data.distance}, Time - ${data.duration}`);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      <div className="airplane-animation">
        <Lottie animationData={airplaneAnimation} loop={true} />
      </div>
      <h1 className="title">Welcome to Flight Route Optimizer ✈️</h1>
      <div className="selection-container">
        <div className="input-group">
          <label>Source:</label>
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select an airport</option>
            {airports.length > 0 ? (
              airports.map((airport) => (
                <option key={airport.iata_code} value={airport.iata_code}>
                  {airport.name} ({airport.iata_code})
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
                <option key={airport.iata_code} value={airport.iata_code}>
                  {airport.iata_code} ({airport.name})
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
        <button onClick={() => handleSelectCriteria("cost")}>💰 Cheapest</button>
        <button onClick={() => handleSelectCriteria("distance")}>📏 Shortest Distance</button>
        <button onClick={() => handleSelectCriteria("time")}>⏳ Fastest</button>
      </Modal>

      {routeData && (
        <MapContainer
          source={routeData.source}
          destination={routeData.destination}
          route={routeData.route}
        />
      )}
    </div>
  );
};

export default Home;
