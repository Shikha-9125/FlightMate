
import React from "react"
import { useLocation, useNavigate } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div className="results-page">
      <div className="results-container">
        <h2>No route data available. Please search again.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
      </div>
    );
  }

  const { source, destination, directDistance, shortestPath, shortestDistance } = location.state;

  return (
    <div className="results-page">
    <div className="results-container">
      <h1>Optimized Flight Route ✈</h1>
      <h2>From: {source} → To: {destination}</h2>

      <div className="route-info">
        <p><b>✈ Direct Distance:</b> {directDistance}</p>

        <h3>🗺 Shortest Path:</h3>
        <ul>
          {shortestPath.map((airport, index) => (
            <li key={index}>
              {index + 1}. {airport}
            </li>
          ))}
        </ul>

        <p>📏 Total Distance: <b>{shortestDistance} km</b></p>
      </div>
      <button className="back-button" onClick={
        ()=>navigate("/")
      }> 🔙 Go Back
</button>
    </div>
    </div>
  );
};

export default Results;