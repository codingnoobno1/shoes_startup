"use client";

import { useState } from "react";
import { ArrowIcon } from "@/components/icons";

type InquiryFormProps = {
  type: "distributor" | "career" | "contact";
  compact?: boolean;
};

export function InquiryForm({ type, compact = false }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="formSuccess" role="status">
        <span>✓</span>
        <h2>Thank you for reaching out.</h2>
        <p>Your enquiry is ready for the team. In production, this will be sent securely to the Luca Brasi business desk.</p>
        <button onClick={() => setSubmitted(false)} type="button">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form
      className={`inquiryForm ${compact ? "compact" : ""}`}
      onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}
    >
      <div className="fieldGrid">
        <label>
          Full name
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" required placeholder="+91" />
        </label>
        {type !== "contact" && (
          <label>
            Company / organisation
            <input name="company" autoComplete="organization" placeholder="Company name" />
          </label>
        )}
        {type === "distributor" && (
          <>
            <label>
              City and state
              <input name="location" required placeholder="e.g. Jaipur, Rajasthan" />
            </label>
            <label>
              Primary interest
              <select name="interest" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option>Leather shoes</option>
                <option>Apparel</option>
                <option>Complete portfolio</option>
              </select>
            </label>
          </>
        )}
        {type === "career" && (
          <label className="fullField">
            Area of interest
            <select name="interest" defaultValue="">
              <option value="" disabled>Select a function</option>
              <option>Retail and sales</option>
              <option>Design and product</option>
              <option>Operations</option>
              <option>Marketing</option>
              <option>Open application</option>
            </select>
          </label>
        )}
        <label className="fullField">
          {type === "career" ? "Tell us about yourself" : "How can we help?"}
          <textarea name="message" required rows={5} placeholder="Share a few useful details..." />
        </label>
      </div>
      <label className="consentField">
        <input type="checkbox" required />
        <span>I agree to be contacted about this enquiry.</span>
      </label>
      <button className="primaryButton formSubmit" type="submit">
        Send enquiry <ArrowIcon />
      </button>
      <p className="prototypeNote">Prototype form — connect a secure API/email or CRM service before launch.</p>
    </form>
  );
}
