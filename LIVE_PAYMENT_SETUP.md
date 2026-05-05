# Live Payment Setup For Shria

Do not paste payment secret keys into chat or commit them to GitHub. Add them only to `server/.env` on your own computer or to your hosting provider environment variables.

## 1. Get Stripe Keys

Open Stripe Dashboard:

```text
https://dashboard.stripe.com/apikeys
```

Switch off test mode when your Stripe account is ready for real payments.

Copy:

```text
STRIPE_SECRET_KEY=sk_live_...
```

Add it to:

```text
server/.env
```

## 2. Get Razorpay Keys

Open Razorpay Dashboard:

```text
https://dashboard.razorpay.com/
```

Go to:

```text
Account & Settings > API Keys
```

Generate Live Mode keys after Razorpay onboarding is complete.

Copy:

```text
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
```

Add them to:

```text
server/.env
```

## 3. Check Keys

Run this from the project folder:

```powershell
npm.cmd run check:payments
```

It shows whether Stripe or Razorpay is ready without printing full secret keys.

## 4. Restart Website

After editing `server/.env`, stop the old terminal windows and start again:

```powershell
.\start-local.cmd
```

Then open:

```text
http://localhost:5173/checkout
```

## 5. Important

For localhost demo orders, use `Local Payment`.

For real customer payment, choose `Stripe` or `Razorpay` after live keys are added.
