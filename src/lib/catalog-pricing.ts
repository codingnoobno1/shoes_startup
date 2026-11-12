"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Product } from "@/data/catalog";

export type PricingOverride = { mrp: number; price: number; offer: string };
export type PricingState = Record<string, PricingOverride>;

export const PRICING_STORAGE_KEY = "lbi-pricing-v1";
export const PRICING_EVENT = "lbi-pricing-updated";
const EMPTY_PRICING: PricingState = {};
let cachedRaw: string | null = null;
let cachedPricing: PricingState = EMPTY_PRICING;

function pricingSnapshot() {
  if (typeof window === "undefined") return EMPTY_PRICING;
  const raw = window.localStorage.getItem(PRICING_STORAGE_KEY) ?? "{}";
  if (raw === cachedRaw) return cachedPricing;
  try {
    cachedPricing = JSON.parse(raw);
  } catch {
    cachedPricing = EMPTY_PRICING;
  }
  cachedRaw = raw;
  return cachedPricing;
}

function subscribePricing(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(PRICING_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(PRICING_EVENT, callback);
  };
}

export function readPricing(): PricingState {
  return pricingSnapshot();
}

export function writePricing(value: PricingState) {
  window.localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(PRICING_EVENT));
}

export function usePricingState() {
  return useSyncExternalStore(subscribePricing, pricingSnapshot, () => EMPTY_PRICING);
}

export function useCatalogPricing(products: Product[]) {
  const overrides = usePricingState();

  return useMemo(
    () =>
      products.map((product) => ({
        ...product,
        ...(overrides[product.id] ?? {}),
      })),
    [overrides, products],
  );
}
