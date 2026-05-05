import { findProductsBySlugs } from "../services/catalogService.js";
import {
  createOrderRecord,
  getOrderRecord,
} from "../services/orderStore.js";
import { calculateTotals, resolveLineItems } from "../utils/orderMath.js";

function createOrderReference() {
  const dayCode = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SHRIA-${dayCode}-${randomCode}`;
}

function validateCustomer(customer) {
  const requiredFields = ["name", "email", "phone", "address", "city", "state", "postalCode", "country"];

  for (const field of requiredFields) {
    if (!customer?.[field]) {
      throw new Error(`Customer field "${field}" is required.`);
    }
  }
}

export async function createOrder(request, response, next) {
  try {
    const { customer, items, paymentMethod, notes = "" } = request.body;
    const requestedItems = Array.isArray(items) ? items : [];

    if (!["local", "stripe", "razorpay"].includes(paymentMethod)) {
      response.status(400);
      throw new Error("Please choose a valid payment method.");
    }

    validateCustomer(customer);

    const catalog = await findProductsBySlugs(requestedItems.map((item) => item.slug));
    const lineItems = resolveLineItems(catalog, requestedItems);
    const totals = calculateTotals(lineItems);

    const order = await createOrderRecord({
      orderReference: createOrderReference(),
      customer,
      items: lineItems,
      totals,
      currency: "INR",
      paymentMethod,
      paymentStatus: paymentMethod === "local" ? "paid" : "awaiting_payment",
      orderStatus: paymentMethod === "local" ? "confirmed" : "pending",
      paymentDetails:
        paymentMethod === "local"
          ? {
              paidAt: new Date().toISOString(),
            }
          : {},
      notes,
    });

    response.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

export async function getOrder(request, response, next) {
  try {
    const order = await getOrderRecord(request.params.orderReference);

    if (!order) {
      response.status(404);
      throw new Error("Order not found.");
    }

    response.json({ order });
  } catch (error) {
    next(error);
  }
}
