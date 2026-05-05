import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "../context/StoreContext.jsx";
import { formatCurrency } from "../lib/commerce.js";

function ProductPage() {
  const { slug } = useParams();
  const { products, catalogLoading, addToCart } = useStore();
  const product = products.find((entry) => entry.slug === slug);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (catalogLoading) {
    return <section className="content-section"><p className="status-copy">Loading this gown...</p></section>;
  }

  if (!product) {
    return (
      <section className="content-section">
        <p className="status-copy error-copy">That gown is not part of the Shria collection.</p>
      </section>
    );
  }

  return (
    <section className="product-page">
      <div className="product-stage">
        <img src={product.imageSrc} alt={product.name} className="product-stage-image" />
      </div>

      <div className="product-details">
        <p className="eyebrow">{product.collectionName}</p>
        <h1>{product.name}</h1>
        <p className="product-page-price">{formatCurrency(product.price, product.currency)}</p>
        <p className="product-page-description">{product.description}</p>

        <div className="product-tag-row">
          <span>{product.palette}</span>
          <span>{product.deliveryEstimate}</span>
          <span>{product.reviewsCount} reviews</span>
        </div>

        <div className="size-selector">
          <p>Choose size</p>
          <div className="size-row">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={size === selectedSize ? "size-chip active" : "size-chip"}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => addToCart(product, { size: selectedSize || product.sizes[0] })}
        >
          Add to Bag
        </button>

        <div className="product-detail-list">
          {product.details.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
