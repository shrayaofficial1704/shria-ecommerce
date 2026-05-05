import { env } from "../config/env.js";

export function resolveLineItems(catalog, requestedItems) {
  if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const productsBySlug = new Map(catalog.map((product) => [product.slug, product]));

  return requestedItems.map((item) => {
    const product = productsBySlug.get(item.slug);

    if (!product) {
      throw new Error(`Product "${item.slug}" could not be found.`);
    }

    const quantity = Math.max(1, Math.min(Number(item.quantity ?? 1), 5));
    const size = item.size && product.sizes.includes(item.size) ? item.size : product.sizes[0];
    const color = item.color && product.colors.includes(item.color) ? item.color : product.colors[0];

    return {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      size,
      color,
      quantity,
      price: product.price,
      artworkId: product.artworkId,
    };
  });
}

export function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= env.freeShippingThreshold ? 0 : env.shippingFee;
  const tax = Math.round(subtotal * env.taxRate);
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}

export function toMinorUnits(amount) {
  return Math.round(amount * 100);
}

