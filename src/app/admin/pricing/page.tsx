import type { Metadata } from "next";
import { PricingAdmin } from "@/components/pricing-admin";

export const metadata: Metadata = { title: "Pricing administration" };

export default function PricingAdminPage() {
  return <PricingAdmin />;
}
