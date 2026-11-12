import type { Metadata } from "next";
import Link from "next/link";
import { DeliveryChecker } from "@/components/delivery-checker";

export const metadata: Metadata = {
  title: "Pan-India delivery",
  description: "Dispatch, tracking and Pan-India delivery information for Luca Brasi International orders.",
};

const journey = [
  { number: "01", title: "Order confirmed", detail: "Your secure advance payment is verified and the order enters preparation." },
  { number: "02", title: "Quality checked", detail: "The selected piece, size and colour are checked before packing." },
  { number: "03", title: "Packed with care", detail: "Protective, presentation-ready packaging is prepared for transit." },
  { number: "04", title: "Courier handover", detail: "A tracking number is issued after the logistics partner scans the parcel." },
  { number: "05", title: "In transit", detail: "Email or WhatsApp updates follow the parcel through regional hubs." },
  { number: "06", title: "At your doorstep", detail: "The courier attempts delivery at the address and mobile number provided." },
];

export default function ShippingPage() {
  return (
    <>
      <section className="shippingHero">
        <div>
          <span className="eyebrow">Pan-India delivery</span>
          <h1>Considered at every mile.</h1>
          <p>Clear dispatch expectations, meaningful tracking updates, and careful doorstep delivery across India.</p>
        </div>
        <DeliveryChecker />
      </section>

      <section className="shippingIntro">
        <div><span className="eyebrow">Our delivery promise</span><h2>Prepared in Yamuna Nagar.<br />Delivered across India.</h2></div>
        <div><p>We aim to dispatch stocked products within 24–48 business hours after secure payment confirmation. Delivery begins once the parcel is scanned by the courier partner.</p><p>Dates shown on the website are estimates rather than guarantees. District-level serviceability, weather, public holidays, local restrictions, and remote routes can affect the final date.</p></div>
      </section>

      <section className="shippingBandsSection">
        <div className="shippingSectionHead"><span className="eyebrow">Indicative timelines</span><h2>One country.<br />Four delivery bands.</h2><p>Estimated business days after dispatch from Yamuna Nagar, Haryana.</p></div>
        <div className="shippingTableWrap">
          <table className="shippingTable">
            <thead><tr><th>Delivery band</th><th>Typical destinations</th><th>Estimate</th><th>Service note</th></tr></thead>
            <tbody>
              <tr><td><span>Band 01</span><strong>North & nearby metros</strong></td><td>Haryana, Delhi NCR, Punjab, Chandigarh and nearby major routes</td><td><strong>2–5 days</strong></td><td>Fastest regular delivery band</td></tr>
              <tr><td><span>Band 02</span><strong>West & Central</strong></td><td>Rajasthan, Gujarat, Maharashtra, Goa, Madhya Pradesh and Chhattisgarh</td><td><strong>3–7 days</strong></td><td>Air or tracked surface movement</td></tr>
              <tr><td><span>Band 03</span><strong>South & East</strong></td><td>Karnataka, Telangana, Andhra Pradesh, Tamil Nadu, Kerala, Odisha, Bihar, Jharkhand and West Bengal</td><td><strong>5–8 days</strong></td><td>Regional hub handover may apply</td></tr>
              <tr><td><span>Band 04</span><strong>Northeast & remote</strong></td><td>Northeastern states, hill districts, islands and limited-service locations</td><td><strong>5–9+ days</strong></td><td>Allow 2–4 additional days where required</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="deliveryJourney">
        <div className="shippingSectionHead"><span className="eyebrow">The order journey</span><h2>Useful updates,<br />not uncertainty.</h2></div>
        <ol>{journey.map((step) => <li key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
      </section>

      <section className="shippingPolicyGrid">
        <article><span>₹2,999+</span><h3>Complimentary delivery</h3><p>Standard delivery is complimentary when the merchandise subtotal reaches ₹2,999 after discounts.</p></article>
        <article><span>2 attempts</span><h3>Delivery assistance</h3><p>Courier partners generally make more than one attempt. Keep the delivery phone available for route calls.</p></article>
        <article><span>Secure</span><h3>Prepaid orders</h3><p>The launch storefront uses advance online payment. No cash or card details are collected by the delivery executive.</p></article>
        <article><span>Tracked</span><h3>Shipment visibility</h3><p>Tracking activates after courier handover. Early status gaps can occur while parcels move between hubs.</p></article>
      </section>

      <section className="shippingFaq">
        <div><span className="eyebrow">Helpful details</span><h2>Before your order travels.</h2></div>
        <div>
          <details open><summary>Can you deliver to every Indian PIN code?</summary><p>Our aim is broad Pan-India coverage, but no courier serves every address continuously. Exact PIN-code serviceability must be confirmed by the production logistics integration at checkout.</p></details>
          <details><summary>When does the delivery estimate begin?</summary><p>The estimate starts after courier dispatch, not at the moment the order is placed. Preparation normally takes 24–48 business hours for stocked items.</p></details>
          <details><summary>How will I receive tracking?</summary><p>Once connected, the order system will send the courier name, tracking number, and tracking link by email and WhatsApp or SMS.</p></details>
          <details><summary>What if the parcel looks damaged?</summary><p>Do not accept a visibly opened or severely damaged parcel. Photograph the package and contact Luca Brasi International promptly with the order number.</p></details>
          <details><summary>Can I change the address after ordering?</summary><p>Contact the team before courier handover. Address changes after dispatch depend on the courier partner and may not be possible.</p></details>
        </div>
      </section>

      <section className="shippingContact"><span className="eyebrow">Need delivery help?</span><h2>Speak with the Luca Brasi team.</h2><p>Share your destination PIN code and the product you are considering.</p><div><Link className="primaryButton" href="/contact">Contact us</Link><a href="mailto:lucabrasiinternational@gmail.com">lucabrasiinternational@gmail.com</a></div></section>
    </>
  );
}
