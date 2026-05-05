const API_BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:5000/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const isJsonResponse = response.headers.get("content-type")?.includes("application/json");
  const payload = isJsonResponse ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Request failed.");
  }

  return payload;
}

export const api = {
  getProducts() {
    return request("/products");
  },
  getProduct(slug) {
    return request(`/products/${slug}`);
  },
  getPaymentConfig() {
    return request("/payments/config");
  },
  createOrder(payload) {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getOrder(orderReference) {
    return request(`/orders/${orderReference}`);
  },
  createStripeCheckoutSession(payload) {
    return request("/payments/stripe/checkout-session", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  confirmStripeOrder(payload) {
    return request("/payments/stripe/confirm", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  createRazorpayOrder(payload) {
    return request("/payments/razorpay/order", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  confirmRazorpayOrder(payload) {
    return request("/payments/razorpay/confirm", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};

