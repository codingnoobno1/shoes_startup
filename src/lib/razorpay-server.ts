import { createHmac, timingSafeEqual } from "node:crypto";

type RazorpayCredentials = { keyId: string; keySecret: string };

export function getRazorpayCredentials(): RazorpayCredentials | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return keyId && keySecret ? { keyId, keySecret } : null;
}

export function basicAuth({ keyId, keySecret }: RazorpayCredentials) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export function signCheckoutToken(orderId: string, amount: number, expiresAt: number, secret: string) {
  const payload = `${orderId}.${amount}.${expiresAt}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function verifyCheckoutToken(
  token: string,
  expectedOrderId: string,
  secret: string,
): { amount: number } | null {
  const [orderId, amountText, expiresText, supplied] = token.split(".");
  if (!orderId || !amountText || !expiresText || !supplied || orderId !== expectedOrderId) return null;
  const payload = `${orderId}.${amountText}.${expiresText}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  if (!safeHexEqual(expected, supplied) || Number(expiresText) < Date.now()) return null;
  const amount = Number(amountText);
  return Number.isInteger(amount) && amount > 0 ? { amount } : null;
}

export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  supplied: string,
  secret: string,
) {
  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return safeHexEqual(expected, supplied);
}

function safeHexEqual(expected: string, supplied: string) {
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return false;
  const expectedBuffer = Buffer.from(expected, "hex");
  const suppliedBuffer = Buffer.from(supplied, "hex");
  return expectedBuffer.length === suppliedBuffer.length && timingSafeEqual(expectedBuffer, suppliedBuffer);
}
