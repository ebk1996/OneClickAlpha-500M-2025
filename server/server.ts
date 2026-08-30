import 'dotenv/config';
import express from 'express';
import tradeRoutes from './routes/trade';
import stripeRoutes from './routes/stripe';
import tatumRoutes from './routes/tatum';
import { validateStripeConfig } from '../lib/stripe';

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 3001;

// For Stripe webhooks, we need raw body
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));

// For all other routes, use JSON parser
app.use(express.json());

// Basic CORS middleware (no external dependency)
app.use((req, res, next) => {
  const origin = req.headers.origin || '';
  let allowedOrigin = '*';

  // Production: use whitelist from CORS_ORIGINS environment variable
  if (process.env.NODE_ENV === 'production' && process.env.CORS_ORIGINS) {
    const allowedOrigins = process.env.CORS_ORIGINS.split(',').map(o => o.trim());
    if (allowedOrigins.includes(origin)) {
      allowedOrigin = origin;
    } else {
      allowedOrigin = allowedOrigins[0] || '*'; // Default to first allowed origin
    }
  } else {
    // Development: use NEXT_PUBLIC_API_URL or wildcard
    allowedOrigin = process.env.NEXT_PUBLIC_API_URL || '*';
  }

  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Routes
app.use('/api/trade', tradeRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/tatum', tatumRoutes);

// Validate Stripe configuration on startup
validateStripeConfig();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Trade API: http://localhost:${PORT}/api/trade`);
  console.log(`💳 Stripe API: http://localhost:${PORT}/api/stripe`);
});
