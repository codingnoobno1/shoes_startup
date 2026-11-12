import Link from "next/link";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerTop">
        <div>
          <span className="eyebrow">Luca Brasi International</span>
          <h2>Quiet confidence,<br />beautifully made.</h2>
        </div>
        <div className="footerLinks">
          <div>
            <h3>Explore</h3>
            <Link href="/">Shop the edit</Link>
            <Link href="/about">Our story</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h3>Partner</h3>
            <Link href="/become-a-distributor">Become a distributor</Link>
            <Link href="/work-with-us">Work with us</Link>
            <Link href="/admin/pricing">Admin demo</Link>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <address>218, Lakshmi Garden, Yamuna Nagar, Haryana</address>
        <a href="mailto:lucabrasiinternational@gmail.com">
          lucabrasiinternational@gmail.com
        </a>
        <span>© {new Date().getFullYear()} Luca Brasi International</span>
      </div>
    </footer>
  );
}
