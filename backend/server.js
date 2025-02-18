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
// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

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

// // Get optimized route using Google Maps API
// app.get("/api/route", async (req, res) => {
//   const { source, destination, criteria } = req.query;

//   if (!source || !destination) {
//     return res.status(400).json({ error: "Source and destination required" });
//   }

//   try {
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/directions/json`,
//       {
//         params: {
//           origin: source,
//           destination: destination,
//           key: GOOGLE_MAPS_API_KEY
//         },
//       }
//     );

//     const route = response.data.routes[0];

//     if (!route) {
//       return res.status(404).json({ error: "No route found" });
//     }

//     let optimizedRoute;
//     if (criteria === "distance") {
//       optimizedRoute = route.legs.reduce((a, b) => a.distance.value < b.distance.value ? a : b);
//     } else if (criteria === "time") {
//       optimizedRoute = route.legs.reduce((a, b) => a.duration.value < b.duration.value ? a : b);
//     } else {
//       optimizedRoute = route;
//     }

//     res.json({
//       distance: optimizedRoute.distance.text,
//       duration: optimizedRoute.duration.text,
//       steps: optimizedRoute.steps.map(step => step.html_instructions)
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching route data" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.AVIATIONSTACK_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Check if API keys are present
if (!API_KEY || !GOOGLE_MAPS_API_KEY) {
  console.error("Missing API keys");
  process.exit(1); // Terminate the server if keys are missing
}

// Fetch all airports
app.get("/api/airports", async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.aviationstack.com/v1/airports?access_key=${API_KEY}`
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching airport data" });
  }
});

// Get optimized route using Google Maps API
app.get("/api/route", async (req, res) => {
  const { source, destination, criteria } = req.query;

  if (!source || !destination) {
    return res.status(400).json({ error: "Source and destination required" });
  }

  // Log incoming query parameters
  console.log("Received request with:", { source, destination, criteria });

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          origin: source,
          destination: destination,
          key: GOOGLE_MAPS_API_KEY
        },
      }
    );

    // Log the response from Google Maps API
    console.log("Google Maps API Response:", response.data);

    const route = response.data.routes[0];

    if (!route) {
      return res.status(404).json({ error: "No route found" });
    }

    let optimizedRoute;
    if (criteria === "distance") {
      optimizedRoute = route.legs.reduce((a, b) => a.distance.value < b.distance.value ? a : b);
    } else if (criteria === "time") {
      optimizedRoute = route.legs.reduce((a, b) => a.duration.value < b.duration.value ? a : b);
    } else {
      optimizedRoute = route;
    }

    res.json({
      distance: optimizedRoute.distance.text,
      duration: optimizedRoute.duration.text,
      steps: optimizedRoute.steps.map(step => step.html_instructions)
    });
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).json({ error: "Error fetching route data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
