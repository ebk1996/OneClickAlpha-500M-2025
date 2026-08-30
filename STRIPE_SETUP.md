# Stripe Integration Setup Guide

## ✅ Stripe is Already Installed

The Stripe Node.js library (v20.0.0) is already included in your `package.json`.

## 🔧 Configuration

### 1. Set Up Environment Variables

Copy `.env.example` to `.env.local` and update the following Stripe variables:

```bash
# Enable Stripe
ENABLE_STRIPE=true

# Your Stripe secret key (get from https://dashboard.stripe.com/apikeys)
STRIPE_API_KEY=sk_test_your_actual_key_here

# Webhook secret (get from https://dashboard.stripe.com/webhooks)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Your product price ID (create in Stripe Dashboard)
STRIPE_PRICE_ID=price_your_actual_price_id_here

# Redirect URLs
STRIPE_SUCCESS_URL=http://localhost:3000/success
STRIPE_CANCEL_URL=http://localhost:3000/cancel
```

### 2. Get Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Secret Key** (starts with `sk_test_` for test mode)
3. Replace the example key in `.env.local`

### 3. Create a Product and Price

1. Go to [Stripe Products](https://dashboard.stripe.com/test/products)
2. Click **"Create product"**
3. Set up your subscription:
   - Name: "OneClickAlpha Subscription"
   - Description: Your product description
   - Pricing: Recurring (monthly/yearly)
   - Price: Your amount
4. Copy the **Price ID** (starts with `price_`)
5. Add it to `.env.local` as `STRIPE_PRICE_ID`

## 🚀 Usage

### Server-Side Integration

The Stripe library is initialized in `lib/stripe.ts`:

```typescript
import { stripe } from '../lib/stripe';

// Example: Create a customer
const customer = await stripe.customers.create({
  email: 'user@example.com',
});
```

### Available API Endpoints

Once your server is running, you'll have these endpoints:

#### 1. Create Checkout Session
```bash
POST http://localhost:3001/api/stripe/create-checkout-session
Content-Type: application/json

{
  "priceId": "price_your_price_id"
}
```

Response:
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/..."
}
```

#### 2. Webhook Handler (for Stripe events)
```bash
POST http://localhost:3001/api/stripe/webhook
```

#### 3. Customer Portal
```bash
POST http://localhost:3001/api/stripe/create-portal-session
Content-Type: application/json

{
  "customerId": "cus_..."
}
```

## 🧪 Testing

### Test Mode
Use test keys (starting with `sk_test_`) for development.

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

## 🔔 Setting Up Webhooks (Local Development)

### Option 1: Stripe CLI (Recommended)
```bash
# Install Stripe CLI
npm install -g stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/stripe/webhook
```

The CLI will give you a webhook signing secret starting with `whsec_`. Add it to your `.env.local`.

### Option 2: Deployed Server
Set up webhooks in [Stripe Dashboard](https://dashboard.stripe.com/webhooks):
- Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
- Events to listen for:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

## 📦 Files Created

- `lib/stripe.ts` - Stripe initialization and configuration
- `server/routes/stripe.ts` - API endpoints for Stripe operations

## 🔒 Security Notes

1. **Never commit real API keys** to version control
2. Use **test keys** (`sk_test_`) for development
3. Use **production keys** (`sk_live_`) only in production
4. Always verify **webhook signatures** (already implemented)
5. Keep your `.env.local` file in `.gitignore`

## 📚 Next Steps

1. ✅ Install dependencies: `npm install` (Stripe already in package.json)
2. ✅ Configure environment variables in `.env.local`
3. ✅ Start your server: `npm run server`
4. Build your checkout UI in Next.js components
5. Test with Stripe test cards

## 📖 Documentation

- [Stripe Node.js Documentation](https://stripe.com/docs/api?lang=node)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
