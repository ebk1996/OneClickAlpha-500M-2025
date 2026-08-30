


# Environment Variables


# ====== 

'''
PRIVATE_KEY=0x_your_wallet_private_key
DUNE_API_KEY=your_dune_key
NANSEN_API_KEY=your_nansen_key
DEBANK_API_KEY=your_debank_key
TELEGRAM_BOT_TOKEN=your_telegram_token
MONGODB_URI=mongodb://localhost:27017/oneclickalpha
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/your_key
API_KEY=sk_live_9f3k8x7m2p1q9v4t6r5e8u7y
'''

# ====== 



<!-- Complete documentation of all environment variables used in the OneClickAlpha project. -->

(Production) -->

### Server Configuration
- **EXPRESS_SERVER_PORT** - Port for Express server (default: 3001)
  - Type: `number`
  - Used in: `server/server.ts`

### Authentication & Security
- **API_KEY** - Master API key for authentication
  - Type: `string` (minimum 10 characters)
  - Used in: `server/middleware/auth.ts`
  - Critical in production

- **TELEGRAM_BOT_TOKEN** - Telegram bot token for notifications
  - Type: `string` (starts with 7xxx or 6xxx)
  - Used in: `app/bot/autoSniper.ts`
  - Required if AUTO_SNIPER_ENABLED=true

### Database
- **MONGODB_URI** - MongoDB connection string
  - Type: `string` (format: mongodb://... or mongodb+srv://...)
  - Used in: `server/server.ts`, `app/server/server.ts`, `app/server/routes/trade.ts`
  - Critical for production

### Node Environment
- **NODE_ENV** - Application environment
  - Type: `string`
  - Valid values: `development`, `production`, `test`
  - Default: `development`

## Optional Integration Variables

### Nansen AI
- **NANSEN_API_KEY** - API key for Nansen smart money tracking
  - Type: `string` (minimum 10 characters)
  - Used in: `lib/nansenAI.ts`
  - Enable with: `ENABLE_NANSEN=true`

### Tatum Blockchain APIs
- **TATUM_API_KEY** - Universal Tatum API key
  - Type: `string` (minimum 10 characters)
  - Used for: Blockchain operations, RPC calls
  - Enable with: `ENABLE_TATUM=true`

- **TATUM_ETHEREUM_RPC** - Tatum Ethereum RPC endpoint
  - Type: `string` (URL format)
  - Used in: Blockchain interactions
  - Paired with: `TATUM_API_KEY`

- **TATUM_JSONRPC_URL** - Tatum JSON-RPC gateway URL (defaults to hosted gateway)
  - Type: `string` (URL format)
  - Used in: `lib/tatum.ts` for blockcount check
  - Paired with: `TATUM_API_KEY`

### Ethereum Providers
- **ALCHEMY_URL** - Alchemy Ethereum RPC endpoint
  - Type: `string` (must contain 'alchemy')
  - Used in: `lib/tradeEngine.ts`, blockchain calls
  - Enable with: `ENABLE_ALCHEMY=true`

## Frontend Variables

- **NEXT_PUBLIC_API_URL** - Frontend API endpoint
  - Type: `string` (format: http://... or https://...)
  - Default: `http://localhost:3001`
  - Used in: React components, frontend calls
  - Must be prefixed with `NEXT_PUBLIC_` to be accessible in browser

## Feature Flags

These optional boolean flags control feature enablement:

- **AUTO_SNIPER_ENABLED** - Enable/disable auto-sniper bot
  - Type: `string` (`true` or `false`)
  - Default: `false`

- **ENABLE_NANSEN** - Enable/disable Nansen integration
  - Type: `string` (`true` or `false`)
  - Default: `false`

- **ENABLE_TATUM** - Enable/disable Tatum integration
  - Type: `string` (`true` or `false`)
  - Default: `false`

- **ENABLE_ALCHEMY** - Enable/disable Alchemy provider
  - Type: `string` (`true` or `false`)
  - Default: `false`

## Environment File Example

Create a `.env.local` file for development:

```env
# Server
EXPRESS_SERVER_PORT=3001
NODE_ENV=development

# Authentication
API_KEY=your_secure_api_key_here_minimum_10_chars

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001

# Optional Features
AUTO_SNIPER_ENABLED=false
ENABLE_NANSEN=false
ENABLE_TATUM=false
ENABLE_ALCHEMY=false

# Optional API Keys (only if enabled)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NANSEN_API_KEY=your_nansen_api_key
TATUM_API_KEY=your_tatum_api_key
TATUM_JSONRPC_URL=https://godmode-ccf74ca5.gateway.tatum.io/
ALCHEMY_URL=your_alchemy_rpc_url
TATUM_ETHEREUM_RPC=your_tatum_rpc_url
```

## For Production Deployment

Create a `.env.production` file with all required variables:

```env
# All required variables above
# Plus secure values for:
# - API_KEY (strong secret)
# - MONGODB_URI (production database)
# - All enabled feature API keys
```

## Validation Rules

### Port Numbers
- Must be numeric when defined
- Valid range: 1024 - 65535
- Default: 3001

### API Keys
- Minimum length: 10 characters
- Must not be `undefined` or `null` in logs
- Should be environment-specific

### URLs
- Must start with `http://` or `https://`
- NEXT_PUBLIC_* must start with protocol

### MongoDB URI
- Must start with `mongodb://` or `mongodb+srv://`
- Contains connection credentials

## Testing Environment Variables

Run the comprehensive environment variable test:

```bash
npm test -- tests/spec/env.spec.ts
```

This validates:
- ✓ Server configuration defaults
- ✓ API key formats and lengths
- ✓ Database URI validity
- ✓ Feature flag formats
- ✓ Sensitive variable protection
