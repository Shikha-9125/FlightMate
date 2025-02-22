

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import Airport from "./models/Airport.js";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

//const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173","https://flight-mate.vercel.app"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


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
// Route Optimization API with Distance & Time Calculation
app.post("/api/find-route", async (req, res) => {
  try {
    const { source, destination } = req.body;

    if (!source || !destination) {
      return res.status(400).json({ error: "Source and destination are required." });
    }

    const airports = await Airport.find();
    const graph = {};

    // Initialize the graph
    airports.forEach(a => {
      graph[a.iata] = {};
    });

    const MAX_FLIGHT_DISTANCE = 10000; // Max distance between airports in km

    for (let i = 0; i < airports.length; i++) {
      for (let j = 0; j < airports.length; j++) {
        const dist = getDistance(
          airports[i].latitude, airports[i].longitude,
          airports[j].latitude, airports[j].longitude
        );

        if (dist <= MAX_FLIGHT_DISTANCE) {
          graph[airports[i].iata][airports[j].iata] = dist;
          graph[airports[j].iata][airports[i].iata] = dist;
        }
      }
    }

    console.log(`🔍 Checking if ${source} and ${destination} are directly connected:`);
    console.log(`➡ Neighbors of ${source}:`, graph[source]);
    console.log(`➡ Neighbors of ${destination}:`, graph[destination]);

    if (!graph[source]) {
      console.log(`❌ Source airport ${source} not found.`);
      return res.status(400).json({ error: `Source airport ${source} not found.` });
    }

    if (!graph[destination]) {
      console.log(`❌ Destination airport ${destination} not found.`);
      return res.status(400).json({ error: `Destination airport ${destination} not found.` });
    }

    // Check for direct flight distance
    const directDistance = graph[source][destination] || null;

    // Dijkstra's Algorithm for Shortest Path
    const dijkstra = (start, end) => {
      console.log(`🔍 Running Dijkstra from ${start} to ${end}`);

      const distances = {};
      const prev = {};
      const pq = new MinPriorityQueue(({ priority }) => priority); 

      for (let airport in graph) {
        distances[airport] = Infinity;
        prev[airport] = null;
      }

      distances[start] = 0;
      pq.enqueue({ element: start, priority: 0 });

      while (!pq.isEmpty()) {
        const { element: minAirport } = pq.dequeue(); 
        console.log(`✅ Visiting: ${minAirport}, Current Distance: ${distances[minAirport]}`);

        if (minAirport === end) break;

        for (let neighbor in graph[minAirport]) {
          let newDist = distances[minAirport] + graph[minAirport][neighbor];

          console.log(`➡ Checking neighbor ${neighbor}, Edge Weight: ${graph[minAirport][neighbor]}, New Distance: ${newDist}`);

          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            prev[neighbor] = minAirport;
            pq.enqueue({ element: neighbor, priority: newDist });
            console.log(`✅ Updating ${neighbor}: Distance = ${newDist}, Previous = ${minAirport}`);
          }
        }
      }

      let path = [];
      let at = end;
      while (at !== null) {
        path.push(at);
        at = prev[at];
      }
      path.reverse();

      console.log(`🔍 Final Path Computed:`, path);
      console.log(`✅ Final Distance:`, distances[end]);

      if (path.length === 1 && path[0] !== start) {
        return { path: [], distance: "Infinity" };
      }

      return { path, distance: distances[end] !== Infinity ? distances[end].toFixed(2) : "Infinity" };
    };

    const result = dijkstra(source, destination);

    console.log(`✅ Shortest Path from ${source} to ${destination}:`, result.path);
    console.log(`✅ Total Distance:`, result.distance);

    res.json({
      directDistance: directDistance ? directDistance.toFixed(2) : "No direct flight",
      shortestPath: result.path,
      shortestDistance: result.distance
    });

  } catch (error) {
    console.error("❌ Error finding route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
