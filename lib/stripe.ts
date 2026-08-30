import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripeApiKey = process.env.STRIPE_API_KEY || '';

if (!stripeApiKey) {
  console.warn('⚠️  Warning: STRIPE_API_KEY is not set in environment variables');
}

// Initialize the Stripe instance
export const stripe = new Stripe(stripeApiKey, {
  apiVersion: '2024-12-18.acacia', // Use the latest API version
  typescript: true,
});

// Check if Stripe is enabled
export const isStripeEnabled = process.env.ENABLE_STRIPE === 'true';

// Helper function to validate Stripe configuration
export function validateStripeConfig(): boolean {
  if (!isStripeEnabled) {
    console.log('ℹ️  Stripe is disabled in configuration');
    return false;
  }
  
  if (!stripeApiKey || stripeApiKey === 'sk_live_9f3k8x7m2p1q9v4t6r5e8u7y') {
    console.error('❌ Stripe API key is missing or using example value. Please set STRIPE_API_KEY in your .env file');
    return false;
  }
  
  console.log('✅ Stripe initialized successfully');
  return true;
}

export default stripe;
