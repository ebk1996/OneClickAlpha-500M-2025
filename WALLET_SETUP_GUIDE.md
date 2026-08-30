# Wallet Setup Guide - MetaMask & Solana Keys

Complete guide for obtaining your wallet private keys and API credentials for OneClickAlpha deployment.

---

## 🦊 MetaMask Private Key (Ethereum)

### Method 1: Export from MetaMask Extension

1. **Open MetaMask** browser extension
2. **Click** the three dots (⋮) in the top right
3. **Select** "Account Details"
4. **Click** "Export Private Key"
5. **Enter** your MetaMask password
6. **Copy** the private key (starts with `0x`)

### Method 2: Mobile App

1. Open MetaMask mobile app
2. Tap the hamburger menu (≡)
3. Go to **Settings** → **Security & Privacy**
4. Tap **Show Private Key**
5. Authenticate and copy the key

### What it looks like:
```
0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
- Always starts with `0x`
- 66 characters total (64 hex + `0x` prefix)

### Security Best Practices:
- ✅ Create a **new wallet** specifically for trading bot
- ✅ Fund it with **test amounts** first
- ✅ **Never** use your main wallet with large holdings
- ✅ Store key in `.env` file (already gitignored)
- ❌ **Never** share or commit to GitHub

---

## 🌐 Alchemy API Key (Ethereum RPC)

MetaMask doesn't have an "API key" - you need an **RPC provider** like Alchemy for programmatic access.

### Steps to Get Alchemy Key:

1. **Sign Up** at https://www.alchemy.com
2. **Click** "Create App"
3. **Fill in details**:
   - Chain: Ethereum
   - Network: Mainnet (or Sepolia for testing)
   - Name: OneClickAlpha Bot
4. **Click** "View Key" on your app dashboard
5. **Copy** the HTTPS URL

### What it looks like:
```
https://eth-mainnet.g.alchemy.com/v2/abc123XYZ456def789ghi012jkl345mn
```

### Alternative RPC Providers:
- **Infura**: https://infura.io
- **QuickNode**: https://www.quicknode.com
- **Ankr**: https://www.ankr.com/rpc

### Add to `.env`:
```bash
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=0xYOUR_METAMASK_PRIVATE_KEY
```

---

## 🔮 Solana Private Key

### Method 1: Export from Phantom Wallet (Recommended)

1. **Open Phantom** browser extension
2. **Click** the hamburger menu (≡)
3. **Go to** Settings → Security & Privacy
4. **Click** "Export Private Key"
5. **Enter** your password
6. **Copy** the base58 private key

### Method 2: Export from Solflare

1. Open **Solflare** wallet
2. Settings → Export Private Key
3. Verify with password
4. Copy the key

### Method 3: Generate New Keypair (CLI)

```bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Generate new keypair
solana-keygen new --outfile ~/solana-trading-bot.json

# View public key
solana-keygen pubkey ~/solana-trading-bot.json

# Convert to base58 (for .env)
# You'll need to use a script or library like bs58
```

### Method 4: Generate New Keypair (Node.js)

```bash
npm install @solana/web3.js bs58
```

```javascript
const { Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

// Generate new keypair
const keypair = Keypair.generate();

// Get base58 private key
const privateKey = bs58.encode(keypair.secretKey);
console.log('Private Key (base58):', privateKey);
console.log('Public Key:', keypair.publicKey.toString());
console.log('Add funds to this address:', keypair.publicKey.toString());
```

### What it looks like:
```
5Jgp7YmW3QK8VvN2xF4dR9tC6bH1eA3kM8sP7qL2wZ4xT9vU6nY5rX8cD3fG1hJ4k
```
- Base58 encoded string
- ~87-88 characters
- No `0x` prefix

### Add to `.env`:
```bash
SOLANA_PRIVATE_KEY=YOUR_BASE58_PRIVATE_KEY_HERE
SOLANA_RPC=https://api.mainnet-beta.solana.com
```

---

## 🚀 Solana RPC Endpoints

### Free Public RPCs:
```bash
# Solana Official (Rate limited)
https://api.mainnet-beta.solana.com

# Jito (MEV-optimized)
https://rpc.jito.wtf
https://mainnet.block-engine.jito.wtf/api/v1/transactions

# Helius (Free tier: 100 req/sec)
https://rpc.helius.xyz/?api-key=YOUR_KEY
```

### Premium RPC Providers:

**1. Helius** (Recommended)
- Sign up: https://www.helius.dev
- Free tier: 100 req/sec
- Paid: Unlimited with websocket support
```bash
SOLANA_RPC=https://rpc.helius.xyz/?api-key=YOUR_HELIUS_KEY
```

**2. QuickNode**
- Sign up: https://www.quicknode.com
- Create endpoint → Solana Mainnet
- Copy HTTP URL
```bash
SOLANA_RPC=https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_KEY/
```

**3. Alchemy (also supports Solana)**
- Sign up: https://www.alchemy.com
- Create App → Solana Mainnet
```bash
SOLANA_RPC=https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY
```

**4. GenesysGo**
- Free public RPC
```bash
SOLANA_RPC=https://ssc-dao.genesysgo.net
```

---

## 📋 Final .env Configuration

```bash
# === ETHEREUM ===
PRIVATE_KEY=0x1234...abcd
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY

# === SOLANA ===
SOLANA_PRIVATE_KEY=5Jgp7YmW3QK8VvN2xF4dR9tC6bH1eA3kM8sP7qL2wZ4xT9vU6nY5rX8cD3fG1hJ4k
SOLANA_RPC=https://rpc.jito.wtf

# === DATA PROVIDERS ===
DUNE_API_KEY=your_dune_key
NANSEN_API_KEY=your_nansen_key
DEBANK_API_KEY=your_debank_key

# === NOTIFICATIONS ===
TELEGRAM_BOT_TOKEN=your_telegram_token

# === DATABASE ===
MONGODB_URI=mongodb://localhost:27017/oneclickalpha
```

---

## ⚠️ Security Checklist

Before deploying:

- [ ] Created **separate wallets** for bot (not main holdings)
- [ ] Funded wallets with **test amounts** only
- [ ] Verified `.env` is in `.gitignore`
- [ ] **Never** committed private keys to Git
- [ ] Stored production keys in platform env vars (Vercel/Render)
- [ ] Enabled 2FA on all exchange/RPC provider accounts
- [ ] Documented wallet addresses in password manager
- [ ] Set spending limits on bot wallets

---

## 🧪 Testing Keys

Test your keys before production:

```bash
# Ethereum - Check balance
curl https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["YOUR_WALLET_ADDRESS","latest"],"id":1}'

# Solana - Check balance
curl https://api.mainnet-beta.solana.com \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getBalance","params":["YOUR_SOLANA_ADDRESS"]}'
```

---

## 🆘 Troubleshooting

### "Invalid Private Key" Error
- Ethereum: Must start with `0x` and be 66 characters
- Solana: Must be base58 encoded, no `0x` prefix

### "Insufficient Funds" Error
- Fund your wallet with ETH/SOL for gas fees
- Minimum: 0.1 ETH or 0.5 SOL for testing

### "Rate Limit Exceeded"
- Upgrade to paid RPC plan
- Use multiple RPC endpoints with fallback

### "Cannot Connect to RPC"
- Verify RPC URL is correct
- Check firewall/network settings
- Try alternative RPC provider

---

## 📚 Additional Resources

- **MetaMask Docs**: https://docs.metamask.io
- **Alchemy Guide**: https://docs.alchemy.com
- **Solana Web3.js**: https://solana-labs.github.io/solana-web3.js
- **Phantom Wallet**: https://phantom.app
- **Solana CLI**: https://docs.solana.com/cli

---

**Remember**: Start with **small test amounts** before scaling to production! 🚀
