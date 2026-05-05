import { useState } from "react";

import ProductGrid from "../components/ProductGrid.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useStore } from "../context/StoreContext.jsx";

function CatalogPage() {
  const { products, catalogLoading, catalogError } = useStore();
  const [selectedPalette, setSelectedPalette] = useState("All");

  const paletteFilters = ["All", ...new Set(products.map((product) => product.palette))];
  const filteredProducts =
    selectedPalette === "All"
      ? products
      : products.filter((product) => product.palette === selectedPalette);

  return (
    <section className="catalog-page">
      <SectionTitle
        eyebrow="Shria Collection"
        title="Choose from all 18 fairy gown samples"
        description="Filter by the mood palette you want, from floral fairytale pieces to jewel-toned shimmer."
      />

      <div className="filter-row">
        {paletteFilters.map((palette) => (
          <button
            key={palette}
            type="button"
            className={palette === selectedPalette ? "filter-chip active" : "filter-chip"}
            onClick={() => setSelectedPalette(palette)}
          >
            {palette}
          </button>
        ))}
      </div>

      {catalogLoading ? <p className="status-copy">Preparing the full collection...</p> : null}
      {catalogError ? <p className="status-copy error-copy">{catalogError}</p> : null}
      {!catalogLoading && !catalogError ? <ProductGrid products={filteredProducts} /> : null}
    </section>
  );
}

export default CatalogPage;
