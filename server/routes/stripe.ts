import express, { Request, Response } from 'express';
import { stripe, isStripeEnabled, validateStripeConfig } from '../../lib/stripe';

const router = express.Router();

// Middleware to check if Stripe is enabled
const checkStripeEnabled = (req: Request, res: Response, next: express.NextFunction) => {
  if (!isStripeEnabled) {
    return res.status(503).json({ 
      error: 'Stripe integration is disabled',
      message: 'Set ENABLE_STRIPE=true in your environment variables'
    });
  }
  
  if (!validateStripeConfig()) {
    return res.status(500).json({ 
      error: 'Stripe configuration invalid',
      message: 'Please configure STRIPE_API_KEY in your environment variables'
    });
  }
  
  next();
};

// Create a checkout session
router.post('/create-checkout-session', checkStripeEnabled, async (req: Request, res: Response) => {
  try {
    const { priceId } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId || process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: process.env.STRIPE_SUCCESS_URL || `${req.headers.origin}/success`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${req.headers.origin}/cancel`,
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle webhook events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ Webhook secret not configured');
    return res.status(400).send('Webhook secret not configured');
  }

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('✅ Checkout session completed:', session.id);
      // TODO: Fulfill the purchase - grant access, update database, etc.
      break;
      
    case 'customer.subscription.created':
      const subscription = event.data.object;
      console.log('✅ Subscription created:', subscription.id);
      // TODO: Handle new subscription
      break;
      
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      console.log('✅ Subscription updated:', updatedSubscription.id);
      // TODO: Handle subscription update
      break;
      
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('⚠️  Subscription cancelled:', deletedSubscription.id);
      // TODO: Handle subscription cancellation - revoke access
      break;
      
    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
});

// Get customer portal session
router.post('/create-portal-session', checkStripeEnabled, async (req: Request, res: Response) => {
  try {
    const { customerId } = req.body;
    
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.STRIPE_SUCCESS_URL || `${req.headers.origin}/account`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
