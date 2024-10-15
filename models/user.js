import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: null }, // Role will be "admin" or null for users
  image: { type: String, default: '/defaultImg.webp' }, // Default image
  location: { type: String, required: true },
})
export default mongoose.models.User || mongoose.model("User",UserSchema)