// models/store.js
import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  categories: [{ type: String }],
  image: { type: String }, // URL to the store image
});

export default mongoose.models.Store || mongoose.model("Store", StoreSchema);
