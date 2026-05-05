import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useStore } from "../context/StoreContext.jsx";

function HomePage() {
  const { featuredProducts, catalogLoading, catalogError, paymentConfig } = useStore();

  return (
    <>
      <Hero />

      <section className="content-section">
        <SectionTitle
          eyebrow="Collection"
          title="18 fairy gowns in the Shria launch drop"
          description="Each look is shaped for detail, movement, and camera-friendly sparkle without losing comfort through the event."
        />

        {catalogLoading ? <p className="status-copy">Loading the atelier collection...</p> : null}
        {catalogError ? <p className="status-copy error-copy">{catalogError}</p> : null}
        {!catalogLoading && !catalogError ? <ProductGrid products={featuredProducts} /> : null}
      </section>

      <section className="content-section content-section-split">
        <div className="atelier-panel">
          <p className="eyebrow">Crafted Detail</p>
          <h2>Built for premium browsing and smooth checkout.</h2>
          <p>
            The storefront pairs cinematic visuals with a lightweight cart flow, while the backend
            keeps products, orders, Stripe, and Razorpay on a clean Express API.
          </p>
        </div>

        <div className="readiness-panel">
          <div className={`provider-pill ${paymentConfig.stripeReady ? "ready" : "pending"}`}>
            Stripe {paymentConfig.stripeReady ? "enabled" : "awaiting keys"}
          </div>
          <div className={`provider-pill ${paymentConfig.razorpayReady ? "ready" : "pending"}`}>
            Razorpay {paymentConfig.razorpayReady ? "enabled" : "awaiting keys"}
          </div>
          <p>
            Once your live keys and MongoDB URI are added, the same project is ready to move from
            catalog demo mode into production checkout.
          </p>
        </div>
      </section>
    </>
  );
}

export default HomePage;
