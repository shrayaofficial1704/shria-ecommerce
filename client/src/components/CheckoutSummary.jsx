import { formatCurrency } from "../lib/commerce.js";

function CheckoutSummary({ items, totals, compact = false }) {
  return (
    <div className={`checkout-summary ${compact ? "is-compact" : ""}`}>
      <div className="checkout-summary-lines">
        {items.map((item) => (
          <div key={`${item.slug}-${item.size}`} className="summary-line">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="summary-breakdown">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <span>{totals.shipping === 0 ? "Free" : formatCurrency(totals.shipping)}</span>
        </div>
        <div className="summary-line">
          <span>Taxes</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div className="summary-line total-line">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;

