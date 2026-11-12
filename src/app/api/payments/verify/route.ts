import { NextResponse } from "next/server";
import {
  basicAuth,
  getRazorpayCredentials,
  verifyCheckoutToken,
  verifyPaymentSignature,
} from "@/lib/razorpay-server";

export const runtime = "nodejs";

type VerificationRequest = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  checkoutToken?: string;
};

export async function POST(request: Request) {
  const credentials = getRazorpayCredentials();
  if (!credentials) return NextResponse.json({ verified: false }, { status: 503 });

  let input: VerificationRequest;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const orderId = input.razorpay_order_id ?? "";
  const paymentId = input.razorpay_payment_id ?? "";
  const signature = input.razorpay_signature ?? "";
  const trustedOrder = verifyCheckoutToken(
    input.checkoutToken ?? "",
    orderId,
    credentials.keySecret,
  );

  if (!trustedOrder || !verifyPaymentSignature(orderId, paymentId, signature, credentials.keySecret)) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const providerResponse = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
    { headers: { Authorization: basicAuth(credentials) }, cache: "no-store" },
  );
  if (!providerResponse.ok) return NextResponse.json({ verified: false }, { status: 502 });

  const payment = (await providerResponse.json()) as {
    order_id: string;
    amount: number;
    currency: string;
    status: string;
  };
  const verified =
    payment.order_id === orderId &&
    payment.amount === trustedOrder.amount &&
    payment.currency === "INR" &&
    payment.status === "captured";

  return NextResponse.json(
    {
      verified,
      message: verified
        ? "Payment verified. Production fulfilment must still wait for the durable order/webhook workflow."
        : "Payment has not reached the captured state.",
    },
    { status: verified ? 200 : 409 },
  );
}
