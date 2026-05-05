import { getProductArtwork } from "../data/productVisuals.js";

export const SHIPPING_FEE = 350;
export const FREE_SHIPPING_THRESHOLD = 25000;
export const TAX_RATE = 0.03;

export function formatCurrency(value, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function calculateCartTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
  };
}

export function enrichProduct(product) {
  return {
    ...product,
    imageSrc: product.image ?? getProductArtwork(product.artworkId, product.name),
  };
}
