import crypto from "node:crypto";

import Razorpay from "razorpay";
import Stripe from "stripe";

import { env } from "../config/env.js";
import { getOrderRecord, updateOrderRecord } from "../services/orderStore.js";
import { toMinorUnits } from "../utils/orderMath.js";

function getStripeClient() {
  if (!env.stripeSecretKey) {
    return null;
  }

  return new Stripe(env.stripeSecretKey);
}

function getRazorpayClient() {
  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    return null;
  }

  return new Razorpay({
    key_id: env.razorpayKeyId,
    key_secret: env.razorpayKeySecret,
  });
}

export function getPaymentConfig(request, response) {
  response.json({
    stripeReady: Boolean(env.stripeSecretKey),
    razorpayReady: Boolean(env.razorpayKeyId && env.razorpayKeySecret),
    razorpayKeyId: env.razorpayKeyId,
  });
}

export async function createStripeCheckoutSession(request, response, next) {
  try {
    const stripe = getStripeClient();

    if (!stripe) {
      response.status(400);
      throw new Error("Stripe keys are missing in the server environment.");
    }

    const { orderReference } = request.body;
    const order = await getOrderRecord(orderReference);

    if (!order) {
      response.status(404);
      throw new Error("Order not found before starting Stripe checkout.");
    }

    const stripeLineItems = [
      ...order.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: order.currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: `${item.color} | Size ${item.size}`,
          },
          unit_amount: toMinorUnits(item.price),
        },
      })),
    ];

    if (order.totals.shipping > 0) {
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: order.currency.toLowerCase(),
          product_data: {
            name: "Shria shipping",
            description: "Standard couture delivery",
          },
          unit_amount: toMinorUnits(order.totals.shipping),
        },
      });
    }

    if (order.totals.tax > 0) {
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: order.currency.toLowerCase(),
          product_data: {
            name: "Shria taxes",
            description: "Calculated at checkout",
          },
          unit_amount: toMinorUnits(order.totals.tax),
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${env.frontendUrl}/success?provider=stripe&session_id={CHECKOUT_SESSION_ID}&order=${orderReference}`,
      cancel_url: `${env.frontendUrl}/checkout`,
      customer_email: order.customer.email,
      metadata: {
        orderReference,
      },
      line_items: stripeLineItems,
    });

    await updateOrderRecord(orderReference, {
      paymentDetails: {
        providerSessionId: session.id,
      },
    });

    response.status(201).json({
      orderReference,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    next(error);
  }
}

export async function confirmStripeOrder(request, response, next) {
  try {
    const stripe = getStripeClient();

    if (!stripe) {
      response.status(400);
      throw new Error("Stripe keys are missing in the server environment.");
    }

    const { orderReference, sessionId } = request.body;
    const order = await getOrderRecord(orderReference);

    if (!order) {
      response.status(404);
      throw new Error("Order not found.");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.metadata?.orderReference !== orderReference) {
      response.status(400);
      throw new Error("Stripe session does not match this order.");
    }

    if (session.payment_status !== "paid") {
      response.status(400);
      throw new Error("Stripe payment is not complete yet.");
    }

    const updatedOrder =
      order.paymentStatus === "paid"
        ? order
        : await updateOrderRecord(orderReference, {
            paymentStatus: "paid",
            orderStatus: "confirmed",
            paymentDetails: {
              ...order.paymentDetails,
              providerSessionId: session.id,
              paidAt: new Date().toISOString(),
            },
          });

    response.json({
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}

export async function createRazorpayOrder(request, response, next) {
  try {
    const razorpay = getRazorpayClient();

    if (!razorpay) {
      response.status(400);
      throw new Error("Razorpay keys are missing in the server environment.");
    }

    const { orderReference } = request.body;
    const order = await getOrderRecord(orderReference);

    if (!order) {
      response.status(404);
      throw new Error("Order not found before Razorpay checkout.");
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: toMinorUnits(order.totals.total),
      currency: order.currency,
      receipt: orderReference,
      notes: {
        orderReference,
        brand: "Shria",
      },
    });

    await updateOrderRecord(orderReference, {
      paymentDetails: {
        ...order.paymentDetails,
        razorpayOrderId: razorpayOrder.id,
      },
    });

    response.status(201).json({
      orderReference,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    next(error);
  }
}

export async function confirmRazorpayOrder(request, response, next) {
  try {
    const { orderReference, razorpayOrderId, razorpayPaymentId, razorpaySignature } = request.body;

    if (!env.razorpayKeySecret) {
      response.status(400);
      throw new Error("Razorpay keys are missing in the server environment.");
    }

    const order = await getOrderRecord(orderReference);

    if (!order) {
      response.status(404);
      throw new Error("Order not found.");
    }

    const generatedSignature = crypto
      .createHmac("sha256", env.razorpayKeySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      response.status(400);
      throw new Error("Razorpay signature verification failed.");
    }

    const updatedOrder =
      order.paymentStatus === "paid"
        ? order
        : await updateOrderRecord(orderReference, {
            paymentStatus: "paid",
            orderStatus: "confirmed",
            paymentDetails: {
              ...order.paymentDetails,
              razorpayOrderId,
              razorpayPaymentId,
              paidAt: new Date().toISOString(),
            },
          });

    response.json({
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
}
