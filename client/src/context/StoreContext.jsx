import { createContext, useContext, useEffect, useState } from "react";

import { api } from "../lib/apiClient.js";
import { calculateCartTotals, enrichProduct } from "../lib/commerce.js";
import fallbackProducts from "../data/fallbackProducts.js";

const StoreContext = createContext(null);
const CART_STORAGE_KEY = "shria-cart";
const ORDER_STORAGE_KEY = "shria-pending-order";

function readStorage(key, fallbackValue) {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function writeStorage(key, value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [paymentConfig, setPaymentConfig] = useState({
    stripeReady: false,
    razorpayReady: false,
    razorpayKeyId: "",
  });
  const [cart, setCart] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [pendingOrder, setPendingOrderState] = useState(() => readStorage(ORDER_STORAGE_KEY, null));

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(ORDER_STORAGE_KEY, pendingOrder);
  }, [pendingOrder]);

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      try {
        const payload = await api.getProducts();
        const apiProducts = Array.isArray(payload.products) ? payload.products : [];
        const nextProducts =
          apiProducts.length >= fallbackProducts.length ? apiProducts : fallbackProducts;

        if (!ignore) {
          setProducts(nextProducts.map(enrichProduct));
          setCatalogError("");
        }
      } catch (error) {
        if (!ignore) {
          setProducts(fallbackProducts.map(enrichProduct));
          setCatalogError("");
        }
      } finally {
        if (!ignore) {
          setCatalogLoading(false);
        }
      }
    }

    async function loadPaymentConfig() {
      try {
        const payload = await api.getPaymentConfig();

        if (!ignore) {
          setPaymentConfig(payload);
        }
      } catch (error) {
        if (!ignore) {
          setPaymentConfig({
            stripeReady: false,
            razorpayReady: false,
            razorpayKeyId: "",
          });
        }
      }
    }

    loadProducts();
    loadPaymentConfig();

    return () => {
      ignore = true;
    };
  }, []);

  function addToCart(product, options = {}) {
    const size = options.size ?? product.sizes[0];
    const quantity = Math.max(1, Number(options.quantity ?? 1));
    const color = options.color ?? product.colors[0];

    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (item) => item.slug === product.slug && item.size === size,
      );

      if (existingIndex === -1) {
        return [
          ...currentCart,
          {
            slug: product.slug,
            name: product.name,
            price: product.price,
            quantity,
            size,
            color,
            artworkId: product.artworkId,
            imageSrc: product.imageSrc,
          },
        ];
      }

      return currentCart.map((item, index) =>
        index === existingIndex
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, 5),
            }
          : item,
      );
    });

    setCartOpen(true);
  }

  function updateCartQuantity(slug, size, nextQuantity) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.slug === slug && item.size === size
            ? {
                ...item,
                quantity: Math.max(1, Math.min(Number(nextQuantity), 5)),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(slug, size) {
    setCart((currentCart) =>
      currentCart.filter((item) => !(item.slug === slug && item.size === size)),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function setPendingOrder(order) {
    setPendingOrderState(order);
  }

  function clearPendingOrder() {
    setPendingOrderState(null);
  }

  const cartTotals = calculateCartTotals(cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <StoreContext.Provider
      value={{
        products,
        featuredProducts,
        catalogLoading,
        catalogError,
        paymentConfig,
        cart,
        cartOpen,
        cartCount,
        cartTotals,
        pendingOrder,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        setPendingOrder,
        clearPendingOrder,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used inside StoreProvider.");
  }

  return context;
}
