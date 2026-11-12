import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notFound">
      <span className="eyebrow">404</span>
      <h1>This piece has left the collection.</h1>
      <p>The page may have moved, but the launch edit is waiting.</p>
      <Link className="primaryButton" href="/">Return to the shop</Link>
    </section>
  );
}
