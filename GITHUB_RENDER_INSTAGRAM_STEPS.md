# Publish Shria For Instagram Bio

Use this guide to upload Shria to GitHub and deploy it to a public Render link.

## What Link Will Go In Instagram Bio?

After deployment, Render gives you a public link like:

```text
https://shria-ecommerce.onrender.com
```

That is the link you put in Instagram bio.

Your local link will not work in Instagram:

```text
http://localhost:5173
```

`localhost` only works on your own laptop.

## Part 1: Upload Project To GitHub

### 1. Open VS Code

Open this folder:

```text
C:\Users\Admin\OneDrive\Documents\New project\shria-ecommerce
```

### 2. Open VS Code Terminal

Use:

```text
Terminal > New Terminal
```

### 3. Run Git Commands

Run these commands one by one:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial Shria ecommerce website"
```

### 4. Create GitHub Repo

Go to:

```text
https://github.com/new
```

Create a repository named:

```text
shria-ecommerce
```

Do not tick these options:

```text
Add a README
Add .gitignore
Choose a license
```

### 5. Connect Local Project To GitHub

GitHub will show a repo URL like:

```text
https://github.com/YOUR-USERNAME/shria-ecommerce.git
```

Run this command with your actual URL:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/shria-ecommerce.git
git push -u origin main
```

## Part 2: Deploy On Render

### 1. Open Render

Go to:

```text
https://dashboard.render.com/
```

### 2. Create Blueprint

Click:

```text
New > Blueprint
```

Connect your GitHub account and choose:

```text
shria-ecommerce
```

Render will read:

```text
render.yaml
```

### 3. Add Environment Variables

For demo/local-payment deployment, use:

```text
NODE_ENV=production
VITE_API_URL=/api
FRONTEND_URL=https://YOUR-RENDER-LINK.onrender.com
```

You can leave these blank for now if you are using Local Payment:

```text
MONGODB_URI
STRIPE_SECRET_KEY
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

### 4. Deploy

Click:

```text
Deploy Blueprint
```

Wait until Render says:

```text
Live
```

### 5. Copy Website Link

Render gives a link like:

```text
https://shria-ecommerce.onrender.com
```

Open it and test:

```text
https://shria-ecommerce.onrender.com/catalog
https://shria-ecommerce.onrender.com/checkout
```

## Part 3: Add Link To Instagram Bio

Open Instagram app:

```text
Profile > Edit Profile > Links > Add external link
```

Paste your Render link:

```text
https://shria-ecommerce.onrender.com
```

Save it.

## Important Notes

Local Payment is enough for your demo website.

Without MongoDB, orders are temporary on Render and can reset when the server restarts.

For a more complete production setup later, add:

```text
MONGODB_URI
```

from MongoDB Atlas.

Do not push real `.env` files or secret keys to GitHub.
