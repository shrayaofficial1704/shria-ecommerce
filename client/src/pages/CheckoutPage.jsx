import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CheckoutSummary from "../components/CheckoutSummary.jsx";
import { useStore } from "../context/StoreContext.jsx";
import { api } from "../lib/apiClient.js";

async function loadRazorpayScript() {
  if (window.Razorpay) {
    return true;
  }

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const defaultForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

function createLocalOrder(customer, items, totals) {
  const dayCode = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomCode = Math.random().toString(36).slice(2, 7).toUpperCase();

  return {
    id: `SHRIA-${dayCode}-${randomCode}`,
    orderReference: `SHRIA-${dayCode}-${randomCode}`,
    customer,
    items,
    totals,
    currency: "INR",
    paymentMethod: "local",
    paymentStatus: "paid",
    orderStatus: "confirmed",
    paymentDetails: {
      paidAt: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
  };
}

function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cart,
    cartTotals,
    paymentConfig,
    clearCart,
    clearPendingOrder,
    pendingOrder,
    setPendingOrder,
  } = useStore();
  const [paymentMethod, setPaymentMethod] = useState("local");
  const [customer, setCustomer] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const providerReady =
    paymentMethod === "local" ||
    (paymentMethod === "stripe" ? paymentConfig.stripeReady : paymentConfig.razorpayReady);

  async function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      setErrorMessage("Add at least one gown to continue.");
      return;
    }

    if (!providerReady) {
      setErrorMessage(`Add ${paymentMethod} keys on the server before using this checkout.`);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");

    try {
      const orderPayload = await api.createOrder({
        customer,
        items: cart,
        paymentMethod,
      });

      const order = orderPayload.order;
      setPendingOrder(order);

      if (paymentMethod === "local") {
        clearCart();
        navigate(`/success?provider=local&order=${order.orderReference}`);
        return;
      }

      if (paymentMethod === "stripe") {
        const stripeSession = await api.createStripeCheckoutSession({
          orderReference: order.orderReference,
        });

        window.location.assign(stripeSession.url);
        return;
      }

      const isRazorpayLoaded = await loadRazorpayScript();

      if (!isRazorpayLoaded) {
        throw new Error("Razorpay checkout could not be loaded.");
      }

      const razorpayOrder = await api.createRazorpayOrder({
        orderReference: order.orderReference,
      });

      const gateway = new window.Razorpay({
        key: paymentConfig.razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Shria",
        description: "Fairy Ball Gown Checkout",
        image: "/assets/logo-mark.svg",
        order_id: razorpayOrder.razorpayOrderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        theme: {
          color: "#b68a5a",
        },
        handler: async (response) => {
          try {
            await api.confirmRazorpayOrder({
              orderReference: order.orderReference,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            clearCart();
            clearPendingOrder();
            navigate(`/success?provider=razorpay&order=${order.orderReference}`);
          } catch (confirmationError) {
            setErrorMessage(confirmationError.message);
          }
        },
      });

      gateway.on("payment.failed", () => {
        setErrorMessage("Razorpay payment was not completed.");
      });

      gateway.open();
    } catch (error) {
      if (paymentMethod === "local") {
        const localOrder = createLocalOrder(customer, cart, cartTotals);
        setPendingOrder(localOrder);
        clearCart();
        navigate(`/success?provider=local&order=${localOrder.orderReference}`);
        return;
      }

      setErrorMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Checkout</p>
            <h1>Complete your Shria order</h1>
            <p className="checkout-helper">
              Use Stripe for hosted card checkout or Razorpay for India-first payment flow.
            </p>
          </div>

          <div className="field-grid">
            {Object.entries(defaultForm).map(([field, initialValue]) => (
              <label key={field} className={field === "address" ? "field full" : "field"}>
                <span>{field.replace(/([A-Z])/g, " $1")}</span>
                <input
                  type={field === "email" ? "email" : "text"}
                  required
                  value={customer[field]}
                  placeholder={initialValue || `Enter ${field}`}
                  onChange={(event) =>
                    setCustomer((currentCustomer) => ({
                      ...currentCustomer,
                      [field]: event.target.value,
                    }))
                  }
                />
              </label>
            ))}
          </div>

          <div className="payment-methods">
            <button
              type="button"
              className={paymentMethod === "local" ? "payment-card active" : "payment-card"}
              onClick={() => setPaymentMethod("local")}
            >
              <strong>Local Payment</strong>
              <span>Place order now for demo and local testing</span>
            </button>
            <button
              type="button"
              className={paymentMethod === "stripe" ? "payment-card active" : "payment-card"}
              disabled={!paymentConfig.stripeReady}
              onClick={() => setPaymentMethod("stripe")}
            >
              <strong>Stripe</strong>
              <span>{paymentConfig.stripeReady ? "Hosted checkout ready" : "Awaiting server keys"}</span>
            </button>
            <button
              type="button"
              className={paymentMethod === "razorpay" ? "payment-card active" : "payment-card"}
              disabled={!paymentConfig.razorpayReady}
              onClick={() => setPaymentMethod("razorpay")}
            >
              <strong>Razorpay</strong>
              <span>
                {paymentConfig.razorpayReady ? "Modal checkout ready" : "Awaiting server keys"}
              </span>
            </button>
          </div>

          {errorMessage ? <p className="status-copy error-copy">{errorMessage}</p> : null}

          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting
              ? "Preparing payment..."
              : paymentMethod === "local"
                ? "Place Order"
                : `Pay with ${paymentMethod === "stripe" ? "Stripe" : "Razorpay"}`}
          </button>

          {pendingOrder ? (
            <p className="checkout-helper">
              Pending order: <strong>{pendingOrder.orderReference}</strong>
            </p>
          ) : null}
        </form>

        <aside className="checkout-panel">
          <h2>Order summary</h2>
          <CheckoutSummary items={cart} totals={cartTotals} />
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
