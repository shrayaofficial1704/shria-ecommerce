import { NavLink, Link } from "react-router-dom";

import { useStore } from "../context/StoreContext.jsx";

function Header() {
  const { cartCount, openCart } = useStore();

  return (
    <header className="site-header">
      <Link to="/" className="brand-lockup" aria-label="Shria home">
        <span className="brand-name">Shria</span>
        <span className="brand-caption">Fairy Ball Gowns</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/catalog">Collection</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>

      <button type="button" className="bag-button" onClick={openCart}>
        Bag
        <span>{cartCount}</span>
      </button>
    </header>
  );
}

export default Header;

