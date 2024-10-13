
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true }, // Changed to a single category
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // Reference to Store
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
