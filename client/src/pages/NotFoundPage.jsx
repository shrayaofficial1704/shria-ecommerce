import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="success-page">
      <p className="eyebrow">Not Found</p>
      <h1>The page you requested is not part of Shria.</h1>
      <Link to="/" className="primary-button">
        Return Home
      </Link>
    </section>
  );
}

export default NotFoundPage;

