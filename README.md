# **Flight Route Finder API ✈️**  
A **Node.js Express API** that finds the shortest flight route between airports using **Dijkstra's Algorithm**. The API uses MongoDB Atlas to store airport data and calculates distances using the **Haversine formula**.  

---

## **📌 Features**
✅ Find the shortest flight route between two airports  
✅ Uses **Dijkstra’s Algorithm** for optimal path calculation  
✅ Fetches airport data from MongoDB Atlas  
✅ Distance calculation using the **Haversine formula**  
✅ Efficient **Priority Queue (MinHeap)** for fast execution  
✅ **CORS enabled** for easy frontend integration  

---

## **🛠 Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Algorithm:** Dijkstra's Algorithm  
- **Libraries:**  
  - `dotenv` (Environment Variables)  
  - `mongoose` (MongoDB ORM)  
  - `@datastructures-js/priority-queue` (Efficient MinHeap for Dijkstra's Algorithm)  
  - `cors` (Cross-Origin Resource Sharing)  

---

## **📥 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Shikha-9125/FlightMate.git
cd FlightMate
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the root directory and add:
```sh
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### **4️⃣ Start the Server**
```sh
npm start
```
Server will run on **`http://localhost:5000`** 🚀  

---

## **🛠 API Endpoints**
### **1️⃣ Find the Shortest Route**
**POST** `/api/find-route`  
Finds the shortest path between two airports.  
#### **Request Body**
```json
{
  "source": "JFK",
  "destination": "LAX"
}
```
#### **Response**
```json
{
  "path": ["JFK", "DFW", "LAX"],
  "distance": "3950.45"
}
```

### **2️⃣ Get All Airports**
**GET** `/api/airports`  
Fetches all available airports from the database.  
#### **Response**
```json
[
  {
    "iata": "JFK",
    "latitude": 40.6413,
    "longitude": -73.7781
  },
  {
    "iata": "LAX",
    "latitude": 33.9416,
    "longitude": -118.4085
  }
]
```

---

## **📌 How It Works**
1. **Fetches all airports from MongoDB Atlas** 🏙️  
2. **Builds a graph** based on flight distance (max 10000 km) 🛫  
3. **Uses Dijkstra’s Algorithm** to find the shortest route 🏁  
4. **Returns the shortest path & total distance** in kilometers ✅  

---

## **🚀 Future Enhancements**
- ✅ Cost-Based Optimization 💰
        1-Store ticket prices for different routes.
        2-Modify Dijkstra's algorithm to prioritize cheapest flights instead of shortest distances.

- ✅ Time-Based Optimization ⏳

        1-Consider layovers and direct flight durations.
        2-Optimize routes to find the fastest travel time rather than just distance.

  ## Deployment
The project is deployed and accessible at:

🔗 [Live Demo](https://flight-mate.vercel.app/)



Feel free to open issues and contribute! 🚀
