import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    artworkId: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderReference: { type: String, required: true, unique: true, trim: true },
    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
    },
    items: { type: [orderItemSchema], required: true, default: [] },
    totals: {
      subtotal: { type: Number, required: true, min: 0 },
      shipping: { type: Number, required: true, min: 0 },
      tax: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 0 },
    },
    currency: { type: String, default: "INR", trim: true },
    paymentMethod: { type: String, required: true, enum: ["local", "stripe", "razorpay"] },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["awaiting_payment", "paid", "failed"],
      default: "awaiting_payment",
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentDetails: {
      providerSessionId: { type: String, trim: true },
      razorpayOrderId: { type: String, trim: true },
      razorpayPaymentId: { type: String, trim: true },
      paidAt: { type: Date },
    },
    notes: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.models.Order ?? mongoose.model("Order", orderSchema);

export default Order;
