"use client";

import { useState } from "react";
import { TruckIcon } from "@/components/icons";

type DeliveryEstimate = {
  region: string;
  estimate: string;
  message: string;
  special?: boolean;
};

const zones: Record<string, DeliveryEstimate> = {
  "1": { region: "North India", estimate: "2–5 business days", message: "Our nearest delivery band from the Yamuna Nagar dispatch point." },
  "2": { region: "North Central India", estimate: "3–5 business days", message: "Regular tracked coverage across major cities and towns." },
  "3": { region: "West India", estimate: "3–6 business days", message: "Tracked surface or air movement based on service availability." },
  "4": { region: "West & Central India", estimate: "4–7 business days", message: "Metro routes may arrive sooner; remote districts may require additional time." },
  "5": { region: "South Central India", estimate: "5–8 business days", message: "Tracked inter-state delivery with regional hub handover." },
  "6": { region: "South India", estimate: "5–8 business days", message: "Air or priority surface delivery depending on the destination." },
  "7": { region: "East & Northeast India", estimate: "5–9 business days", message: "Remote, island and hill routes can take 2–4 additional business days." },
  "8": { region: "East India", estimate: "5–8 business days", message: "Final timing depends on district-level courier coverage." },
  "9": { region: "Special postal zone", estimate: "Confirmation required", message: "Army Postal Service and special PIN codes need manual courier confirmation.", special: true },
};

export function DeliveryChecker({ compact = false }: { compact?: boolean }) {
  const [pin, setPin] = useState("");
  const [estimate, setEstimate] = useState<DeliveryEstimate | null>(null);
  const [error, setError] = useState("");

  function checkDelivery() {
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setEstimate(null);
      setError("Enter a valid six-digit Indian PIN code.");
      return;
    }
    setError("");
    setEstimate(zones[pin[0]]);
  }

  return (
    <div className={compact ? "deliveryChecker compact" : "deliveryChecker"}>
      <div className="deliveryCheckerTitle">
        <span className="deliveryCheckerIcon"><TruckIcon /></span>
        <div><strong>Check delivery to your PIN code</strong><small>Pan-India tracked delivery from Yamuna Nagar</small></div>
      </div>
      <div className="deliveryPinForm">
        <label><span className="srOnly">Delivery PIN code</span><input value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} onKeyDown={(event) => { if (event.key === "Enter") checkDelivery(); }} inputMode="numeric" autoComplete="postal-code" placeholder="Enter 6-digit PIN" /></label>
        <button type="button" onClick={checkDelivery}>Check</button>
      </div>
      {error && <p className="deliveryError" role="alert">{error}</p>}
      {estimate && (
        <div className={`deliveryResult ${estimate.special ? "special" : ""}`} role="status">
          <div><span>{estimate.region}</span><strong>{estimate.estimate}</strong></div>
          <p>{estimate.message}</p>
        </div>
      )}
      <p className="deliveryDisclaimer">Indicative estimate after dispatch. Final serviceability and date will be confirmed by the connected courier partner at checkout.</p>
    </div>
  );
}
