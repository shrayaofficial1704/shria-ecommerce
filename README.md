# Shria E-commerce

Shria is a full-stack MERN e-commerce website for a fairy ball gown collection. It includes:

- React + Vite storefront
- Express + Node.js API
- MongoDB-ready product and order models
- Stripe hosted checkout
- Razorpay modal checkout
- 18 sample fairy gown products
- Docker and Render deployment configuration

## Project Structure

```text
shria-ecommerce/
|-- client/
|-- server/
|-- Dockerfile
|-- render.yaml
`-- README.md
```

## Features

- Premium landing page for the `Shria` brand
- Collection grid with 18 curated fairy gowns
- Product detail pages with size selection
- Sliding shopping bag
- Checkout flow with shipping form
- Stripe checkout session creation and confirmation
- Razorpay order creation and signature verification
- MongoDB seeding plus demo fallback when `MONGODB_URI` is not set

## Local Setup

1. Install dependencies:

```powershell
cd "C:\Users\Admin\OneDrive\Documents\New project\shria-ecommerce"
npm.cmd install --prefix server
npm.cmd install --prefix client
```

2. Copy environment files:

```powershell
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
```

3. Update the server environment values:

- `MONGODB_URI`
- `STRIPE_SECRET_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `FRONTEND_URL`

4. Start the backend:

```powershell
npm.cmd run dev --prefix server
```

5. Start the frontend in a second terminal:

```powershell
npm.cmd run dev --prefix client
```

## Run In VS Code

Open the `shria-ecommerce` folder in VS Code, then use:

```text
Terminal > Run Task > Start Shria Full Stack
```

Then open:

```text
http://localhost:5173
```

You can also open the browser directly from:

```text
Run and Debug > Open Shria in Chrome
```

More detailed local instructions are in `LOCALHOST_GUIDE.md`.

On Windows, you can also double-click `start-local.cmd` in the project folder. It opens the backend, frontend, and browser for you.

## Live Payments

Stripe and Razorpay live payments need your own private account keys. Add them in `server/.env`, then run:

```powershell
npm.cmd run check:payments
```

Detailed steps are in `LIVE_PAYMENT_SETUP.md`.

## Public Instagram Bio Link

To upload this project to GitHub and deploy it to a public Render URL, follow:

```text
GITHUB_RENDER_INSTAGRAM_STEPS.md
```

## MongoDB Seeding

After setting `MONGODB_URI`, you can seed the 18 sample gowns:

```powershell
npm.cmd run seed --prefix server
```

## Payment Notes

- Stripe uses a hosted checkout session and returns to `/success`.
- Razorpay opens a modal checkout and verifies signatures on the server.
- Without payment keys, the storefront still loads and clearly marks payment providers as not ready.

## Deployment

### Render

1. Push the `shria-ecommerce` folder as its own GitHub repo.
2. Create a new Render Web Service.
3. Let Render detect `render.yaml`.
4. Add the environment variables from `server/.env.example`.
5. Set `FRONTEND_URL` to your deployed Render URL.

### Docker

```powershell
docker build -t shria-ecommerce .
docker run -p 5000:5000 --env-file server/.env shria-ecommerce
```

## Demo Behavior

If MongoDB is not configured, the API serves the product catalog from local seed data so the design and browsing experience still work. Order persistence stays in memory in that mode.
