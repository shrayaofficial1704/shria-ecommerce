import { env } from "../src/config/env.js";

function mask(value) {
  if (!value) {
    return "missing";
  }

  return `${value.slice(0, 8)}...${value.slice(-4)}`;
}

function checkStripe() {
  const hasSecret = Boolean(env.stripeSecretKey);
  const looksLive = env.stripeSecretKey.startsWith("sk_live_");
  const looksTest = env.stripeSecretKey.startsWith("sk_test_");

  return {
    name: "Stripe",
    ready: hasSecret && (looksLive || looksTest),
    key: mask(env.stripeSecretKey),
    mode: looksLive ? "live" : looksTest ? "test" : "unknown",
    message: hasSecret ? "Stripe secret key found." : "Missing STRIPE_SECRET_KEY.",
  };
}

function checkRazorpay() {
  const hasKeyId = Boolean(env.razorpayKeyId);
  const hasSecret = Boolean(env.razorpayKeySecret);
  const looksLive = env.razorpayKeyId.startsWith("rzp_live_");
  const looksTest = env.razorpayKeyId.startsWith("rzp_test_");

  return {
    name: "Razorpay",
    ready: hasKeyId && hasSecret && (looksLive || looksTest),
    keyId: mask(env.razorpayKeyId),
    keySecret: hasSecret ? "set" : "missing",
    mode: looksLive ? "live" : looksTest ? "test" : "unknown",
    message: hasKeyId && hasSecret ? "Razorpay keys found." : "Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET.",
  };
}

const checks = [checkStripe(), checkRazorpay()];

for (const check of checks) {
  console.log(`\n${check.name}`);
  console.log(`Ready: ${check.ready ? "yes" : "no"}`);
  console.log(`Mode: ${check.mode}`);

  if (check.name === "Stripe") {
    console.log(`Secret key: ${check.key}`);
  } else {
    console.log(`Key id: ${check.keyId}`);
    console.log(`Key secret: ${check.keySecret}`);
  }

  console.log(check.message);
}

const anyReady = checks.some((check) => check.ready);

if (!anyReady) {
  console.log("\nNo live payment gateway is ready yet. Add keys in server/.env, then run this command again.");
  process.exitCode = 1;
}

