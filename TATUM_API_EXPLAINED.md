# Tatum API - Multi-Chain Support Explained

## 🤔 TL;DR: Does Tatum Support Solana?

**YES!** Tatum is a **unified multi-chain API** that supports 100+ blockchains including:
- ✅ **Ethereum** (EVM chains)
- ✅ **Solana**
- ✅ Bitcoin, Polygon, BSC, Avalanche, Cardano, Algorand, etc.

**One API key works for ALL chains** - that's the beauty of Tatum.

---

## 🌐 What is Tatum?

Tatum is a **blockchain infrastructure platform** that provides:
- Unified API across 100+ blockchains
- RPC endpoints (like Alchemy, but multi-chain)
- Wallet creation & management
- NFT APIs
- Token data
- Transaction building & signing

**Think of it as**: Alchemy + Infura + Moralis combined into one API

---

## ✅ Yes, Your Tatum Key Works for Solana!

### Single API Key = All Chains

```bash
# ONE key for everything
TATUM_API_KEY=t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n

# Use it for Ethereum
curl -X GET "https://api.tatum.io/v3/ethereum/block/current" \
  -H "x-api-key: t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n"

# Use the SAME key for Solana
curl -X GET "https://api.tatum.io/v3/solana/block/current" \
  -H "x-api-key: t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n"

# Use the SAME key for Bitcoin
curl -X GET "https://api.tatum.io/v3/bitcoin/block/current" \
  -H "x-api-key: t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n"
```

---

## 🆚 Tatum vs Alchemy vs Other Providers

| Feature | Tatum | Alchemy | Infura | Helius |
|---------|-------|---------|--------|--------|
| **Ethereum** | ✅ | ✅ | ✅ | ❌ |
| **Solana** | ✅ | ✅ | ❌ | ✅ |
| **Bitcoin** | ✅ | ❌ | ❌ | ❌ |
| **100+ chains** | ✅ | ❌ | ❌ | ❌ |
| **Single API key** | ✅ | ❌ | ❌ | ❌ |
| **NFT APIs** | ✅ | ✅ | ❌ | ✅ |
| **Free tier** | ✅ 5 req/sec | ✅ 300M units | ✅ 100k req/day | ✅ 100 req/sec |

**Tatum's Advantage**: One key for everything, simplifies your infrastructure

---

## 🔧 How to Use Tatum for Both Ethereum & Solana

### Option 1: Tatum as Primary Provider (Simplest)

```bash
# .env
TATUM_API_KEY=t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n

# For Ethereum
ETHEREUM_RPC=https://api.tatum.io/v3/blockchain/node/ethereum-mainnet
# OR use Tatum's SDK (auto-handles RPC)

# For Solana
SOLANA_RPC=https://api.tatum.io/v3/blockchain/node/solana-mainnet
# OR use Tatum's SDK
```

### Option 2: Tatum + Specialized Providers (Recommended for Production)

```bash
# .env
TATUM_API_KEY=t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n

# Primary Ethereum RPC (Alchemy - specialized, faster)
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_key

# Primary Solana RPC (Helius - specialized, MEV protection)
SOLANA_RPC=https://rpc.helius.xyz/?api-key=your_key

# Fallback to Tatum for both (if primary fails)
TATUM_ETHEREUM_RPC=https://api.tatum.io/v3/blockchain/node/ethereum-mainnet
TATUM_SOLANA_RPC=https://api.tatum.io/v3/blockchain/node/solana-mainnet
```

**Why both?**
- Tatum: Great for development, wallet management, multi-chain apps
- Alchemy/Helius: Optimized for high-performance trading, lower latency
- Redundancy: If one goes down, fallback to the other

---

## 📝 Revised .env Files

### Updated .env.example

```bash
# === ETHEREUM BLOCKCHAIN ===
PRIVATE_KEY=0x_your_wallet_private_key
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_key
# Optional: Tatum as Ethereum fallback
TATUM_ETHEREUM_RPC=https://api.tatum.io/v3/blockchain/node/ethereum-mainnet

# === SOLANA BLOCKCHAIN ===
SOLANA_PRIVATE_KEY=your_base58_key_here
SOLANA_RPC=https://rpc.jito.wtf
# Optional: Tatum as Solana fallback
TATUM_SOLANA_RPC=https://api.tatum.io/v3/blockchain/node/solana-mainnet

# === TATUM (MULTI-CHAIN API) ===
# One key for Ethereum, Solana, Bitcoin, and 100+ chains
TATUM_API_KEY=t-your_tatum_api_key_here

# === DATA PROVIDERS ===
DUNE_API_KEY=bOe2WBRLlTUGRxSap9gUjuHpSGbhFpOG
NANSEN_API_KEY=zgmUMwWCCWqbSCq5rVGtlStHu3GEHDxS
DEBANK_API_KEY=your_debank_key

# === NOTIFICATIONS ===
TELEGRAM_BOT_TOKEN=your_telegram_token

# === DATABASE ===
MONGODB_URI=mongodb://localhost:27017/oneclickalpha

# === LEGACY (if needed) ===
API_KEY=sk_live_9f3k8x7m2p1q9v4t6r5e8u7y
```

---

## 🚀 Getting Your Tatum API Key

### Step-by-Step

1. **Sign Up**
   - Go to: https://dashboard.tatum.io
   - Create free account

2. **Get API Key**
   - Dashboard → API Keys
   - Click "Create API Key"
   - Name it (e.g., "OneClickAlpha Production")
   - Copy the key (starts with `t-`)

3. **Choose Plan**
   - **Free**: 5 requests/sec (25 credits/month)
   - **Start**: $49/mo (100 req/sec, 2500 credits)
   - **Pro**: $499/mo (Unlimited)

4. **Test Your Key**
   ```bash
   # Test Ethereum
   curl -X GET "https://api.tatum.io/v3/ethereum/block/current" \
     -H "x-api-key: YOUR_TATUM_KEY"
   
   # Test Solana
   curl -X GET "https://api.tatum.io/v3/solana/block/current" \
     -H "x-api-key: YOUR_TATUM_KEY"
   ```

---

## 💻 Using Tatum in Your Code

### Example: Ethereum Balance Check

```javascript
// Using Tatum SDK
import { TatumSDK, Network } from '@tatumio/tatum';

const tatum = await TatumSDK.init({
  network: Network.ETHEREUM,
  apiKey: process.env.TATUM_API_KEY
});

const balance = await tatum.address.getBalance({
  addresses: ['0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb']
});

console.log(balance);
```

### Example: Solana Balance Check

```javascript
// Same SDK, different network
const tatumSolana = await TatumSDK.init({
  network: Network.SOLANA,
  apiKey: process.env.TATUM_API_KEY  // SAME KEY!
});

const balance = await tatumSolana.address.getBalance({
  addresses: ['DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK']
});
```

### Example: RPC Endpoint (Direct)

```javascript
// For Ethereum
const provider = new ethers.JsonRpcProvider(
  'https://api.tatum.io/v3/blockchain/node/ethereum-mainnet',
  {
    headers: {
      'x-api-key': process.env.TATUM_API_KEY
    }
  }
);

// For Solana
const connection = new Connection(
  'https://api.tatum.io/v3/blockchain/node/solana-mainnet',
  {
    httpHeaders: {
      'x-api-key': process.env.TATUM_API_KEY
    }
  }
);
```

---

## 🎯 When to Use Tatum vs Specialized Providers

### Use Tatum When:
- ✅ Building multi-chain apps (Ethereum + Solana + others)
- ✅ Need wallet management APIs
- ✅ Want simplified infrastructure (one key)
- ✅ Development/testing phase
- ✅ NFT-heavy applications

### Use Alchemy/Helius When:
- ✅ High-frequency trading (lower latency)
- ✅ Need advanced features (trace APIs, simulations)
- ✅ Require 99.99% uptime SLA
- ✅ Heavy websocket usage
- ✅ Production trading bot

### Best Practice: Use Both
```javascript
// Primary: Specialized provider
let provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);

// Fallback: Tatum
const fallbackProvider = new ethers.JsonRpcProvider(
  process.env.TATUM_ETHEREUM_RPC,
  { headers: { 'x-api-key': process.env.TATUM_API_KEY } }
);

// Auto-fallback on error
try {
  const balance = await provider.getBalance(address);
} catch (error) {
  console.log('Primary failed, using Tatum fallback');
  const balance = await fallbackProvider.getBalance(address);
}
```

---

## 📊 Tatum Pricing (Updated 2025)

| Plan | Cost | Requests/Sec | Credits/Month | Best For |
|------|------|--------------|---------------|----------|
| **Free** | $0 | 5 | 25 | Testing |
| **Start** | $49 | 100 | 2,500 | Small apps |
| **Pro** | $499 | Unlimited | 50,000 | Trading bots |
| **Enterprise** | Custom | Custom | Custom | Institutions |

**Credits System**: Different operations cost different credits
- Simple RPC call: 1 credit
- NFT metadata: 10 credits
- Complex queries: 50+ credits

---

## ⚠️ Important Notes

### 1. Rate Limits
- Free tier: 5 req/sec might be too slow for trading
- Upgrade to Start/Pro for production

### 2. Not a Pure RPC Provider
- Tatum is more than RPC (wallet APIs, NFTs, etc.)
- Slightly higher latency than pure RPC providers
- Trade-off: convenience vs speed

### 3. API Key Format
```
Tatum:   t-678f9a0b-1c2d-3e4f-5g6h-7i8j9k0l1m2n
Alchemy: abc123XYZ456def789ghi012jkl345mn
```
They're different services - don't confuse them!

---

## 🔄 Migration Path

### Current Setup (Alchemy + Jito)
```bash
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_key
SOLANA_RPC=https://rpc.jito.wtf
```

### Add Tatum as Fallback
```bash
# Keep existing
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_key
SOLANA_RPC=https://rpc.jito.wtf

# Add Tatum
TATUM_API_KEY=t-your_key
TATUM_ETHEREUM_RPC=https://api.tatum.io/v3/blockchain/node/ethereum-mainnet
TATUM_SOLANA_RPC=https://api.tatum.io/v3/blockchain/node/solana-mainnet
```

### Full Migration (Optional)
```bash
# Replace everything with Tatum
TATUM_API_KEY=t-your_key
ETHEREUM_RPC=https://api.tatum.io/v3/blockchain/node/ethereum-mainnet
SOLANA_RPC=https://api.tatum.io/v3/blockchain/node/solana-mainnet
```

---

## 📚 Resources

- **Tatum Docs**: https://docs.tatum.io
- **Dashboard**: https://dashboard.tatum.io
- **Supported Chains**: https://tatum.io/supported-blockchains
- **SDK Examples**: https://github.com/tatumio/tatum-js

---

## ✅ Final Recommendation

**For OneClickAlpha:**

```bash
# Best of both worlds
TATUM_API_KEY=t-your_key              # Multi-chain fallback
ALCHEMY_URL=https://...                # Ethereum primary
SOLANA_RPC=https://rpc.jito.wtf       # Solana primary (MEV-optimized)
```

**Why?**
- Alchemy: Best for Ethereum trading (low latency)
- Jito: Best for Solana MEV protection
- Tatum: Fallback + convenience for development/testing

---

**Bottom Line**: Yes, your Tatum API key works for both Ethereum AND Solana. It's one key for 100+ blockchains. Add it as a fallback to your existing specialized providers for maximum reliability! 🚀
