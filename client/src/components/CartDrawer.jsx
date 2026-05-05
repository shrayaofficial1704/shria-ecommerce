import { Link } from "react-router-dom";

import { useStore } from "../context/StoreContext.jsx";
import { formatCurrency } from "../lib/commerce.js";
import CheckoutSummary from "./CheckoutSummary.jsx";

function CartDrawer() {
  const {
    cart,
    cartOpen,
    cartTotals,
    closeCart,
    removeFromCart,
    updateCartQuantity,
  } = useStore();

  return (
    <>
      <button
        type="button"
        className={`cart-overlay ${cartOpen ? "is-open" : ""}`}
        onClick={closeCart}
        aria-label="Close bag"
      />

      <aside className={`cart-drawer ${cartOpen ? "is-open" : ""}`} aria-label="Shopping bag">
        <div className="cart-drawer-header">
          <div>
            <p className="eyebrow">Your Bag</p>
            <h3>Selected Shria gowns</h3>
          </div>
          <button type="button" className="drawer-close" onClick={closeCart}>
            Close
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-bag">
            <p>Your bag is empty right now.</p>
            <Link to="/catalog" onClick={closeCart}>
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={`${item.slug}-${item.size}`}>
                  <img src={item.imageSrc} alt={item.name} />
                  <div className="cart-item-details">
                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        {item.color} | Size {item.size}
                      </p>
                    </div>
                    <p>{formatCurrency(item.price)}</p>
                    <div className="quantity-row">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.slug, item.size, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.slug, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => removeFromCart(item.slug, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <CheckoutSummary items={cart} totals={cartTotals} compact />

            <Link to="/checkout" className="primary-button full-width" onClick={closeCart}>
              Proceed to Checkout
            </Link>
          </>
        )}
      </aside>
    </>
  );
}

export default CartDrawer;

