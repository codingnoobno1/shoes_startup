"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { dealerCoupons as seededCoupons, products } from "@/data/catalog";
import {
  type PricingState,
  PRICING_STORAGE_KEY,
  usePricingState,
  writePricing,
} from "@/lib/catalog-pricing";
import { discountPercent, inr } from "@/lib/money";

const COUPON_STORAGE_KEY = "lbi-dealer-coupons-v1";
const COUPON_EVENT = "lbi-coupons-updated";

type Coupon = (typeof seededCoupons)[number];
let cachedCouponRaw: string | null = null;
let cachedCoupons: Coupon[] = seededCoupons;

function couponSnapshot() {
  if (typeof window === "undefined") return seededCoupons;
  const raw = window.localStorage.getItem(COUPON_STORAGE_KEY) ?? "";
  if (raw === cachedCouponRaw) return cachedCoupons;
  try {
    cachedCoupons = raw ? JSON.parse(raw) : seededCoupons;
  } catch {
    cachedCoupons = seededCoupons;
  }
  cachedCouponRaw = raw;
  return cachedCoupons;
}

function subscribeCoupons(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(COUPON_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COUPON_EVENT, callback);
  };
}

function defaultPricing(): PricingState {
  return Object.fromEntries(
    products.map((product) => [
      product.id,
      { mrp: product.mrp, price: product.price, offer: product.offer },
    ]),
  );
}

export function PricingAdmin() {
  const storedPricing = usePricingState();
  const storedCoupons = useSyncExternalStore(subscribeCoupons, couponSnapshot, () => seededCoupons);
  const [pricingDraft, setPricingDraft] = useState<PricingState | null>(null);
  const [couponDraft, setCouponDraft] = useState<Coupon[] | null>(null);
  const [tab, setTab] = useState<"pricing" | "coupons">("pricing");
  const [status, setStatus] = useState("");
  const pricing = useMemo(
    () => ({ ...defaultPricing(), ...storedPricing, ...(pricingDraft ?? {}) }),
    [pricingDraft, storedPricing],
  );
  const coupons = couponDraft ?? storedCoupons;

  const activeCoupons = useMemo(() => coupons.filter((coupon) => coupon.active).length, [coupons]);

  function updateProduct(id: string, field: "mrp" | "price" | "offer", value: string) {
    setPricingDraft((current) => {
      const base = current ?? pricing;
      return {
        ...base,
        [id]: {
          ...base[id],
          [field]: field === "offer" ? value : Math.max(0, Number(value)),
        },
      };
    });
  }

  function savePricing() {
    const invalid = products.find(({ id }) => pricing[id].price <= 0 || pricing[id].price > pricing[id].mrp);
    if (invalid) {
      setStatus(`Check ${invalid.name}: selling price must be above zero and no higher than MRP.`);
      return;
    }
    writePricing(pricing);
    setPricingDraft(null);
    setStatus("Pricing and offer titles saved in this browser. The shop now reflects these values.");
  }

  function updateCoupon(index: number, patch: Partial<Coupon>) {
    setCouponDraft((current) => (current ?? coupons).map((coupon, couponIndex) => couponIndex === index ? { ...coupon, ...patch } : coupon));
  }

  function saveCoupons() {
    window.localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupons));
    window.dispatchEvent(new Event(COUPON_EVENT));
    setCouponDraft(null);
    setStatus(`${activeCoupons} of 20 dealer coupons active. Saved in this browser.`);
  }

  function resetDemo() {
    window.localStorage.removeItem(PRICING_STORAGE_KEY);
    window.localStorage.removeItem(COUPON_STORAGE_KEY);
    setPricingDraft(null);
    setCouponDraft(null);
    window.dispatchEvent(new Event("lbi-pricing-updated"));
    window.dispatchEvent(new Event(COUPON_EVENT));
    setStatus("Prototype data reset to the launch defaults.");
  }

  return (
    <section className="adminPage">
      <div className="adminHeading">
        <div><span className="eyebrow">Store operations · prototype</span><h1>Pricing & promotions</h1><p>Manage launch pricing, offer titles, and dealer coupon activation.</p></div>
        <button className="secondaryButton" type="button" onClick={resetDemo}>Reset demo data</button>
      </div>

      <div className="adminWarning"><strong>Prototype only</strong><span>Changes persist in this browser. Add sign-in, database storage, server validation, and audit logs before production.</span></div>

      <div className="adminTabs" role="tablist">
        <button className={tab === "pricing" ? "active" : ""} onClick={() => setTab("pricing")} role="tab" aria-selected={tab === "pricing"}>Product pricing <span>{products.length}</span></button>
        <button className={tab === "coupons" ? "active" : ""} onClick={() => setTab("coupons")} role="tab" aria-selected={tab === "coupons"}>Dealer coupons <span>{activeCoupons}/20 active</span></button>
      </div>

      {tab === "pricing" ? (
        <div className="adminPanel">
          <div className="adminPanelHeading"><div><h2>Catalog pricing</h2><p>Discount is calculated automatically from MRP and selling price.</p></div><button className="primaryButton" onClick={savePricing} type="button">Save pricing</button></div>
          <div className="pricingTableWrap">
            <table className="pricingTable">
              <thead><tr><th>Product</th><th>MRP</th><th>Selling price</th><th>Discount</th><th>Offer title</th></tr></thead>
              <tbody>
                {products.map((product) => {
                  const value = pricing[product.id];
                  return (
                    <tr key={product.id}>
                      <td><strong>{product.name}</strong><small>{product.id} · {product.category}</small></td>
                      <td><label><span className="srOnly">MRP for {product.name}</span><span>₹</span><input type="number" min="1" value={value.mrp} onChange={(event) => updateProduct(product.id, "mrp", event.target.value)} /></label></td>
                      <td><label><span className="srOnly">Selling price for {product.name}</span><span>₹</span><input type="number" min="1" value={value.price} onChange={(event) => updateProduct(product.id, "price", event.target.value)} /></label></td>
                      <td><strong className="discountPill">{discountPercent(value.mrp, value.price)}% off</strong><small>{inr.format(Math.max(0, value.mrp - value.price))} saved</small></td>
                      <td><input aria-label={`Offer title for ${product.name}`} value={value.offer} onChange={(event) => updateProduct(product.id, "offer", event.target.value)} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="adminPanel">
          <div className="adminPanelHeading"><div><h2>Dealer coupon reserve</h2><p>Assign and activate a code only when the corresponding dealer is appointed.</p></div><button className="primaryButton" onClick={saveCoupons} type="button">Save coupons</button></div>
          <div className="couponGrid">
            {coupons.map((coupon, index) => (
              <article className={coupon.active ? "couponCard active" : "couponCard"} key={coupon.code}>
                <div><span>#{String(coupon.id).padStart(2, "0")}</span><label className="switch"><input type="checkbox" checked={coupon.active} onChange={(event) => updateCoupon(index, { active: event.target.checked })} /><span /></label></div>
                <code>{coupon.code}</code>
                <label>Dealer name<input value={coupon.dealer} onChange={(event) => updateCoupon(index, { dealer: event.target.value })} /></label>
                <label>Discount<select value={coupon.discount} onChange={(event) => updateCoupon(index, { discount: Number(event.target.value) })}><option value="5">5%</option><option value="10">10%</option><option value="15">15%</option><option value="20">20%</option></select></label>
              </article>
            ))}
          </div>
        </div>
      )}

      {status && <p className="adminStatus" role="status">{status}</p>}
    </section>
  );
}
