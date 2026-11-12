"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ShieldIcon } from "@/components/icons";
import { getProduct, products } from "@/data/catalog";
import { useCatalogPricing } from "@/lib/catalog-pricing";
import { inr } from "@/lib/money";

type PaymentMethod = "upi" | "gpay" | "card";
type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type RazorpayCheckout = new (options: Record<string, unknown>) => { open: () => void };

declare global {
  interface Window { Razorpay?: RazorpayCheckout }
}

function loadRazorpayCheckout() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const source = "https://checkout.razorpay.com/v1/checkout.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${source}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = source;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export function Checkout() {
  const searchParams = useSearchParams();
  const requested = getProduct(searchParams.get("product") ?? "") ?? products[0];
  const [product] = useCatalogPricing([requested]);
  const quantity = Math.max(1, Number(searchParams.get("qty")) || 1);
  const size = searchParams.get("size") ?? product.sizes[0];
  const colour = searchParams.get("colour") ?? product.colours[0].name;
  const [payment, setPayment] = useState<PaymentMethod>("upi");
  const [message, setMessage] = useState("");
  const [paying, setPaying] = useState(false);
  const subtotal = product.price * quantity;
  const delivery = subtotal >= 2999 ? 0 : 149;

  async function beginPayment(form: HTMLFormElement) {
    setPaying(true);
    setMessage("");
    try {
      const loaded = await loadRazorpayCheckout();
      const Razorpay = window.Razorpay;
      if (!loaded || !Razorpay) throw new Error("Secure checkout could not be loaded.");

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: product.slug, quantity, size, colour }),
      });
      const order = await orderResponse.json() as {
        error?: string;
        keyId?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        checkoutToken?: string;
      };
      if (!orderResponse.ok || !order.keyId || !order.orderId || !order.checkoutToken) {
        throw new Error(order.error ?? "Payment order could not be created.");
      }

      const formData = new FormData(form);
      const checkout = new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Luca Brasi International",
        description: product.name,
        order_id: order.orderId,
        prefill: {
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          contact: String(formData.get("phone") ?? ""),
        },
        theme: { color: "#07162f" },
        handler: async (response: RazorpaySuccess) => {
          const verification = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, checkoutToken: order.checkoutToken }),
          });
          const result = await verification.json() as { message?: string };
          setMessage(result.message ?? (verification.ok ? "Payment verified." : "Payment could not be verified."));
          setPaying(false);
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      checkout.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment could not be started.");
      setPaying(false);
    }
  }

  return (
    <section className="checkoutPage">
      <div className="checkoutHeader">
        <div>
          <span className="eyebrow">Secure checkout</span>
          <h1>Complete your order.</h1>
        </div>
        <div className="secureLabel"><ShieldIcon /> Protected provider handoff</div>
      </div>

      <div className="checkoutGrid">
        <form
          className="checkoutForm"
          onSubmit={(event) => { event.preventDefault(); void beginPayment(event.currentTarget); }}
        >
          <section>
            <div className="checkoutStep"><span>1</span><h2>Contact & delivery</h2></div>
            <div className="fieldGrid">
              <label>Full name<input name="name" required autoComplete="name" /></label>
              <label>Mobile number<input name="phone" required type="tel" autoComplete="tel" /></label>
              <label className="fullField">Email address<input name="email" required type="email" autoComplete="email" /></label>
              <label className="fullField">Delivery address<textarea required rows={3} autoComplete="street-address" /></label>
              <label>City<input required autoComplete="address-level2" /></label>
              <label>PIN code<input required inputMode="numeric" pattern="[0-9]{6}" autoComplete="postal-code" /></label>
            </div>
          </section>

          <section>
            <div className="checkoutStep"><span>2</span><h2>Advance payment</h2></div>
            <div className="paymentMethods">
              <button type="button" className={payment === "upi" ? "active" : ""} onClick={() => setPayment("upi")}><strong>UPI / QR</strong><small>Any UPI app</small></button>
              <button type="button" className={payment === "gpay" ? "active" : ""} onClick={() => setPayment("gpay")}><strong>Google Pay</strong><small>Fast mobile checkout</small></button>
              <button type="button" className={payment === "card" ? "active" : ""} onClick={() => setPayment("card")}><strong>Debit / Credit card</strong><small>Provider-secured form</small></button>
            </div>
            <div className="paymentPreview">
              {payment === "upi" && <><div className="qrPlaceholder"><span>LB</span></div><p>A dynamic provider QR will appear here and expire after the payment window.</p></>}
              {payment === "gpay" && <p>Google Pay will open through the configured payment provider on supported devices.</p>}
              {payment === "card" && <p>Card details will be collected by PCI-compliant provider-hosted fields—not by this application.</p>}
            </div>
          </section>

          {message && <p className="checkoutNotice" role="status">{message}</p>}
          <button className="primaryButton checkoutButton" type="submit" disabled={paying}>{paying ? "Opening secure checkout…" : `Pay ${inr.format(subtotal + delivery)} securely`}</button>
          <p className="prototypeNote">Razorpay order creation and immediate signature/status verification are scaffolded. Live fulfilment still requires durable orders, verified idempotent webhooks, and merchant credentials.</p>
        </form>

        <aside className="orderSummary">
          <h2>Your selection</h2>
          <div className="summaryProduct">
            <div><Image src={product.image} alt={product.name} fill sizes="112px" /></div>
            <span><strong>{product.name}</strong><small>{colour} · Size {size} · Qty {quantity}</small><Link href={`/product/${product.slug}`}>Edit selection</Link></span>
          </div>
          <label className="couponField">Dealer coupon<div><input placeholder="Enter coupon code" /><button type="button" onClick={() => setMessage("Dealer coupons are inactive in this storefront prototype.")}>Apply</button></div></label>
          <dl>
            <div><dt>Subtotal</dt><dd>{inr.format(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{delivery ? inr.format(delivery) : "Complimentary"}</dd></div>
            <div className="summaryTotal"><dt>Total</dt><dd>{inr.format(subtotal + delivery)}</dd></div>
          </dl>
          <p>Taxes included. Payment confirmation is created only after a verified provider response.</p>
        </aside>
      </div>
    </section>
  );
}
