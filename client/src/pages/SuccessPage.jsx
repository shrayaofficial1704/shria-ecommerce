import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useStore } from "../context/StoreContext.jsx";
import { api } from "../lib/apiClient.js";
import { formatCurrency } from "../lib/commerce.js";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const { clearCart, clearPendingOrder, pendingOrder } = useStore();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Confirming your payment...");

  const provider = searchParams.get("provider");
  const sessionId = searchParams.get("session_id");
  const orderReference = searchParams.get("order");

  useEffect(() => {
    let ignore = false;

    async function loadConfirmation() {
      try {
        let payload;

        if (provider === "stripe" && sessionId && orderReference) {
          payload = await api.confirmStripeOrder({ orderReference, sessionId });
        } else if (orderReference) {
          payload = await api.getOrder(orderReference);
        } else {
          throw new Error("Order confirmation details were missing.");
        }

        if (!ignore) {
          setOrder(payload.order);
          setStatus("success");
          setMessage("Your Shria order is confirmed.");
          clearCart();
          clearPendingOrder();
        }
      } catch (error) {
        if (!ignore) {
          if (provider === "local" && pendingOrder?.orderReference === orderReference) {
            setOrder(pendingOrder);
            setStatus("success");
            setMessage("Your Shria order is confirmed.");
            clearCart();
            clearPendingOrder();
            return;
          }

          setStatus("error");
          setMessage(error.message);
        }
      }
    }

    loadConfirmation();

    return () => {
      ignore = true;
    };
  }, [clearCart, clearPendingOrder, orderReference, pendingOrder, provider, sessionId]);

  return (
    <section className="success-page">
      <p className="eyebrow">Order Status</p>
      <h1>{status === "success" ? "Order complete" : "Confirmation in progress"}</h1>
      <p className={status === "error" ? "status-copy error-copy" : "status-copy"}>{message}</p>

      {order ? (
        <div className="success-card">
          <p>
            Order reference: <strong>{order.orderReference}</strong>
          </p>
          <p>
            Payment method: <strong>{order.paymentMethod}</strong>
          </p>
          <p>
            Order total: <strong>{formatCurrency(order.totals.total, order.currency)}</strong>
          </p>
        </div>
      ) : null}

      <Link to="/catalog" className="primary-button">
        Continue Browsing
      </Link>
    </section>
  );
}

export default SuccessPage;
