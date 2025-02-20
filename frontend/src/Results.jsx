import { useLocation, useNavigate } from "react-router-dom";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return (
      <div className="results-container">
        <h2>No route data available. Please search again.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const { source, destination, route, distance, time } = location.state;

  return (
    <div className="results-container">
      <h1>Optimized Flight Route ✈</h1>
      <h2>From: {source} → To: {destination}</h2>

      <div className="route-info">
        <h3>🗺 Route:</h3>
        <ul>
          {route.map((airport, index) => (
            <li key={index}>
              {index + 1}. {airport}
            </li>
          ))}
        </ul>

        <p>📏 Total Distance: <b>{distance} km</b></p>
        <p>⏳ Estimated Time: <b>{time} hrs</b></p>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        🔙 Search Again
      </button>
    </div>
  );
};

export default Results;
