import type { Metadata } from "next";
import { Suspense } from "react";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = { title: "Secure checkout" };

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pageLoading">Preparing your checkout…</div>}>
      <Checkout />
    </Suspense>
  );
}
