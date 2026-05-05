import { Link } from "react-router-dom";

import { formatCurrency } from "../lib/commerce.js";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.slug}`} className="product-card-media">
        <img src={product.imageSrc} alt={product.name} />
      </Link>

      <div className="product-card-content">
        <div className="product-card-header">
          <div>
            <p className="product-card-palette">{product.palette}</p>
            <Link to={`/product/${product.slug}`} className="product-card-title">
              {product.name}
            </Link>
          </div>
          <p className="product-card-price">{formatCurrency(product.price, product.currency)}</p>
        </div>

        <p className="product-card-description">{product.shortDescription}</p>

        <div className="product-meta-row">
          <span>{product.deliveryEstimate}</span>
          <span>{product.rating.toFixed(1)} / 5</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

