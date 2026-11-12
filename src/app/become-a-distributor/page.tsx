import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Become a distributor" };

export default function DistributorPage() {
  return (
    <>
      <section className="opportunityHero">
        <span className="eyebrow">Grow with Luca Brasi</span>
        <h1>Bring a modern menswear name<br /><em>to your market.</em></h1>
        <p>We are building a thoughtful distribution network with partners who understand their customers and care about the retail experience.</p>
      </section>
      <section className="opportunityBody">
        <div className="opportunityBenefits">
          <span className="eyebrow">The partnership</span>
          <h2>A focused portfolio.<br />A clear point of view.</h2>
          <ol>
            <li><span>01</span><div><strong>Distinctive positioning</strong><p>A premium visual identity and coordinated head-to-toe assortment.</p></div></li>
            <li><span>02</span><div><strong>Commercial support</strong><p>Launch guidance, product knowledge, and market-aligned planning.</p></div></li>
            <li><span>03</span><div><strong>Long-term thinking</strong><p>Selective partnerships designed around sustainable local growth.</p></div></li>
          </ol>
        </div>
        <div className="formPanel">
          <h2>Start a conversation</h2>
          <p>Tell us about your market and business.</p>
          <InquiryForm type="distributor" compact />
        </div>
      </section>
    </>
  );
}
