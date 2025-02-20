import mongoose from "mongoose";

const airportSchema = new mongoose.Schema({
  iata: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

export default mongoose.model("Airport", airportSchema);
