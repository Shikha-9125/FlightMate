
// import dotenv from 'dotenv';
// import express from 'express';
// import axios from 'axios';
// import cors from 'cors';

// dotenv.config();

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.AVIATIONSTACK_API_KEY;

// // Check if API key is present
// if (!API_KEY) {
//   console.error("Missing AviationStack API key");
//   process.exit(1); // Terminate the server if the key is missing
// }

// // Fetch all airports
// app.get("/api/airports", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`
//     );
//     res.json(response.data.data);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching airport data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import Airport from "./models/Airport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


// Haversine formula to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Route Optimization API
app.post("/api/find-route", async (req, res) => {
  const { source, destination } = req.body;
  
  if (!source || !destination) {
    return res.status(400).json({ error: "Source and destination are required." });
  }

  const airports = await Airport.find();
  const graph = {};

  // Convert airports into a graph representation
  airports.forEach(a => {
    graph[a.iata] = {};
  });

  for (let i = 0; i < airports.length; i++) {
    for (let j = i + 1; j < airports.length; j++) {
      const dist = getDistance(
        airports[i].latitude, airports[i].longitude,
        airports[j].latitude, airports[j].longitude
      );
      graph[airports[i].iata][airports[j].iata] = dist;
      graph[airports[j].iata][airports[i].iata] = dist;
    }
  }

  // Dijkstra’s Algorithm
  const dijkstra = (start, end) => {
    const distances = {};
    const prev = {};
    const queue = new Set(Object.keys(graph));

    for (let airport in graph) distances[airport] = Infinity;
    distances[start] = 0;

    while (queue.size) {
      let minAirport = [...queue].reduce((a, b) => 
        distances[a] < distances[b] ? a : b
      );

      queue.delete(minAirport);
      if (minAirport === end) break;

      for (let neighbor in graph[minAirport]) {
        let newDist = distances[minAirport] + graph[minAirport][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          prev[neighbor] = minAirport;
        }
      }
    }

    // Reconstruct path
    let path = [];
    for (let at = end; at; at = prev[at]) path.push(at);
    return { path: path.reverse(), distance: distances[end] };
  };

  const result = dijkstra(source, destination);
  res.json(result);
});

// Fetch & Store Airports from AviationStack API
app.get("/api/fetch-airports", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/airports?access_key=${process.env.AVIATIONSTACK_API_KEY}`
    );

    if (!response.data || !response.data.data) {
      return res.status(500).json({ error: "Invalid API response" });
    }

    const airports = response.data.data
      .filter(airport => airport.iata_code) // Ensure valid IATA codes
      .map(airport => ({
        iata: airport.iata_code,
        name: airport.airport_name,
        latitude: airport.latitude,
        longitude: airport.longitude,
      }));

    await Airport.deleteMany(); // Remove old data before inserting new
    await Airport.insertMany(airports);

    res.json({ message: "Airports saved successfully!" });
  } catch (error) {
    console.error("❌ Error fetching airports:", error);
    res.status(500).json({ error: "Error fetching airports" });
  }
});


// Get Airports for Frontend Dropdown
app.get("/api/airports", async (req, res) => {
  const airports = await Airport.find();
  res.json(airports);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));