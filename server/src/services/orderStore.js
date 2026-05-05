import Order from "../models/Order.js";
import { isDatabaseReady } from "../config/db.js";

const demoOrders = new Map();

function serializeOrder(order) {
  const normalized = order?.toObject ? order.toObject() : order;

  if (!normalized) {
    return null;
  }

  return {
    id: normalized._id?.toString?.() ?? normalized.id ?? normalized.orderReference,
    ...normalized,
  };
}

export async function createOrderRecord(payload) {
  if (isDatabaseReady()) {
    const createdOrder = await Order.create(payload);
    return serializeOrder(createdOrder);
  }

  const now = new Date().toISOString();
  const order = {
    ...payload,
    id: payload.orderReference,
    createdAt: now,
    updatedAt: now,
  };

  demoOrders.set(payload.orderReference, order);
  return order;
}

export async function getOrderRecord(orderReference) {
  if (isDatabaseReady()) {
    const order = await Order.findOne({ orderReference }).lean();
    return serializeOrder(order);
  }

  return demoOrders.get(orderReference) ?? null;
}

export async function updateOrderRecord(orderReference, patch) {
  if (isDatabaseReady()) {
    const order = await Order.findOneAndUpdate({ orderReference }, patch, {
      new: true,
    }).lean();

    return serializeOrder(order);
  }

  const existingOrder = demoOrders.get(orderReference);

  if (!existingOrder) {
    return null;
  }

  const nextOrder = {
    ...existingOrder,
    ...patch,
    customer: patch.customer ?? existingOrder.customer,
    totals: patch.totals ?? existingOrder.totals,
    paymentDetails: {
      ...existingOrder.paymentDetails,
      ...patch.paymentDetails,
    },
    updatedAt: new Date().toISOString(),
  };

  demoOrders.set(orderReference, nextOrder);
  return nextOrder;
}

