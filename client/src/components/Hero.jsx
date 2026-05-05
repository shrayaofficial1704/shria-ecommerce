import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Shria Atelier</p>
        <h1>Fairy ball gowns designed for the kind of evening people remember.</h1>
        <p className="hero-description">
          Discover an 18-piece couture collection of luminous silhouettes, layered tulle, and
          fantasy-inspired detail work built for weddings, formals, galas, and photo moments.
        </p>

        <div className="hero-actions">
          <Link to="/catalog" className="primary-button">
            Explore the Collection
          </Link>
          <Link to="/checkout" className="secondary-button">
            Checkout Demo
          </Link>
        </div>
      </div>

      <div className="hero-cards" aria-label="Shria highlights">
        <article>
          <span>18</span>
          <p>signature fairy ball gowns</p>
        </article>
        <article>
          <span>2</span>
          <p>live payment rails: Stripe and Razorpay</p>
        </article>
        <article>
          <span>1</span>
          <p>deployable MERN storefront ready for MongoDB-backed orders</p>
        </article>
      </div>
    </section>
  );
}

export default Hero;
