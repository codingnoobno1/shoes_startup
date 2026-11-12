import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <section className="formPage">
      <div className="formIntro">
        <span className="eyebrow">Concierge</span>
        <h1>Let’s talk.</h1>
        <p>Questions about a piece, an order, or Luca Brasi International? Our team would be pleased to help.</p>
        <div className="contactCard">
          <span>Visit</span>
          <address>218, Lakshmi Garden<br />Yamuna Nagar, Haryana</address>
          <span>Email</span>
          <a href="mailto:lucabrasiinternational@gmail.com">lucabrasiinternational@gmail.com</a>
        </div>
      </div>
      <InquiryForm type="contact" />
    </section>
  );
}
