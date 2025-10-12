import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
