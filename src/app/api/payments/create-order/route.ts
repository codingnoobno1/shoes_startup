import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getProduct } from "@/data/catalog";
import {
  basicAuth,
  getRazorpayCredentials,
  signCheckoutToken,
} from "@/lib/razorpay-server";

export const runtime = "nodejs";

type OrderRequest = {
  productSlug?: string;
  quantity?: number;
  size?: string;
  colour?: string;
};

export async function POST(request: Request) {
  const credentials = getRazorpayCredentials();
  if (!credentials) {
    return NextResponse.json(
      { error: "Payment provider is not configured.", code: "PAYMENT_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let input: OrderRequest;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const product = getProduct(input.productSlug ?? "");
  const quantity = Number(input.quantity);
  if (
    !product ||
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > 5 ||
    !product.sizes.includes(input.size ?? "") ||
    !product.colours.some((item) => item.name === input.colour)
  ) {
    return NextResponse.json({ error: "Invalid product or variant." }, { status: 400 });
  }

  const subtotalRupees = product.price * quantity;
  const deliveryRupees = subtotalRupees >= 2999 ? 0 : 149;
  const amount = (subtotalRupees + deliveryRupees) * 100;
  const receipt = `lbi_${Date.now()}_${randomUUID().slice(0, 8)}`;

  const providerResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: basicAuth(credentials),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
      notes: {
        product_id: product.id,
        quantity: String(quantity),
        size: input.size,
        colour: input.colour,
      },
    }),
    cache: "no-store",
  });

  if (!providerResponse.ok) {
    return NextResponse.json({ error: "Unable to create a payment order." }, { status: 502 });
  }

  const order = (await providerResponse.json()) as { id: string; amount: number; currency: string };
  const expiresAt = Date.now() + 15 * 60 * 1000;
  return NextResponse.json({
    keyId: credentials.keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    checkoutToken: signCheckoutToken(order.id, order.amount, expiresAt, credentials.keySecret),
  });
}
