import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", trim: true },
    category: { type: String, required: true, trim: true },
    collectionName: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    palette: { type: String, required: true, trim: true },
    colors: [{ type: String, required: true, trim: true }],
    sizes: [{ type: String, required: true, trim: true }],
    featured: { type: Boolean, default: false },
    inventory: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 4.8, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    deliveryEstimate: { type: String, required: true, trim: true },
    artworkId: { type: String, required: true, trim: true },
    sortOrder: { type: Number, required: true, default: 0 },
    details: [{ type: String, trim: true }],
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.models.Product ?? mongoose.model("Product", productSchema);

export default Product;
