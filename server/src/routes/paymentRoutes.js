import { Router } from "express";

import {
  confirmRazorpayOrder,
  confirmStripeOrder,
  createRazorpayOrder,
  createStripeCheckoutSession,
  getPaymentConfig,
} from "../controllers/paymentController.js";

const router = Router();

router.get("/config", getPaymentConfig);
router.post("/stripe/checkout-session", createStripeCheckoutSession);
router.post("/stripe/confirm", confirmStripeOrder);
router.post("/razorpay/order", createRazorpayOrder);
router.post("/razorpay/confirm", confirmRazorpayOrder);

export default router;

