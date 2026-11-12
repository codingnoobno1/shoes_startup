import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Our story" };

export default function AboutPage() {
  return (
    <>
      <section className="editorialHero">
        <span className="eyebrow">Our point of view</span>
        <h1>Made for presence,<br /><em>not performance.</em></h1>
        <p>Luca Brasi International creates modern menswear for men who value restraint, substance, and the confidence of things made well.</p>
      </section>
      <section className="storyGrid">
        <div className="storyImage"><Image src="/products/navy-blazer.jpg" alt="Midnight navy tailored blazer" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
        <div className="storyCopy">
          <span className="eyebrow">Yamuna Nagar · Haryana</span>
          <h2>A sharper everyday wardrobe.</h2>
          <p>We began with a simple belief: formal style should feel personal, composed, and easy to live in. Our collections bring together polished leather, purposeful tailoring, and dependable essentials.</p>
          <p>We favour clean proportions, rich materials, and a palette that moves easily from work to occasion—pieces designed to earn their place, season after season.</p>
          <Link className="textLink" href="/">Discover the launch edit <span>→</span></Link>
        </div>
      </section>
    </>
  );
}
