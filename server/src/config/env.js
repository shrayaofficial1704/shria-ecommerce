import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
  mongodbUri: process.env.MONGODB_URI ?? "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ?? "",
  shippingFee: Number(process.env.SHIPPING_FEE ?? 350),
  freeShippingThreshold: Number(process.env.FREE_SHIPPING_THRESHOLD ?? 25000),
  taxRate: Number(process.env.TAX_RATE ?? 0.03),
};

