# Project Structure Guide

Complete reference for the OneClickAlpha directory and file organization.

---

## 📁 Root Directory Layout

```
OneClickAlpha-500M-2025/
├── 📱 app/                      # Next.js App Router directory
├── 🤖 bot/                      # Trading bot logic
├── 🧩 components/               # Reusable React components
├── 🛠️ lib/                      # Core trading libraries
├── 🔧 server/                   # Express backend
├── 🧪 tests/                    # Test suites
├── 📄 Configuration Files       # (see below)
└── 📚 Documentation Files       # (see below)
```

---

## 📱 Frontend: `/app` Directory

Next.js 14 App Router structure for the trading dashboard.

```
app/
├── page.tsx                # Main dashboard (http://localhost:3000)
├── layout.tsx              # Root layout wrapper
├── globals.css             # Global TailwindCSS styles
├── bot/                    # Bot management pages (future)
├── components/             # App-specific components
└── server/                 # Legacy server code (deprecated)
```

### Key Files

#### `app/page.tsx`
Main trading dashboard with:
- Real-time whale tracking display
- Quadfecta signal aggregation panel
- Manual trade execution buttons
- Profit/loss cards

#### `app/layout.tsx`
Root layout providing:
- HTML structure
- Font loading (Inter)
- Global providers
- Metadata configuration

#### `app/globals.css`
TailwindCSS directives and custom styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧩 Components: `/components` Directory

Reusable React components for the UI.

```
components/
├── AlphaButton.tsx         # Primary action button
├── ProfitCard.tsx          # P&L display card
├── QuadfectaPanel.tsx      # Signal aggregation UI
└── ScaleButton.tsx         # Trade size selector
```

### Component Descriptions

| Component | Purpose | Props |
|-----------|---------|-------|
| `AlphaButton` | Styled button for actions | `onClick`, `children`, `variant` |
| `ProfitCard` | Display profit/loss metrics | `profit`, `token`, `timestamp` |
| `QuadfectaPanel` | Show 4 data source signals | `signals`, `threshold` |
| `ScaleButton` | Quick trade size selection | `amount`, `onSelect` |

**Testing**: All components have corresponding tests in `tests/frontend/`

---

## 🛠️ Trading Libraries: `/lib` Directory

Core trading logic and blockchain integrations.

```
lib/
├── quadfectaEngine.ts      # Signal aggregation from 4 sources
├── tradeEngine.ts          # Trade execution (Ethereum)
├── jitoGodmode.ts          # Solana MEV protection
├── whaleSniperV2.ts        # Whale copy-trading logic
├── nansenAI.ts             # Nansen API integration
├── duneAlpha.ts            # Dune Analytics queries
├── debankAlpha.ts          # DeBank wallet rankings
└── arkham.ts               # Arkham entity mapping
```

### Library Descriptions

#### `quadfectaEngine.ts`
**Purpose**: Aggregates signals from 4 data sources  
**Exports**: `aggregateSignals()`, `calculateConfidence()`  
**Dependencies**: nansenAI, duneAlpha, debankAlpha, arkham

```typescript
export async function aggregateSignals(token: string) {
  const signals = await Promise.all([
    nansenSignal(token),
    duneSignal(token),
    debankSignal(token),
    arkhamSignal(token)
  ]);
  return calculateConfidence(signals);
}
```

#### `tradeEngine.ts`
**Purpose**: Execute trades on Ethereum  
**Exports**: `executeTrade()`, `estimateGas()`  
**Dependencies**: ethers.js, ccxt

```typescript
export async function executeTrade(params: TradeParams) {
  // Multi-DEX routing
  // Gas optimization
  // Slippage protection
}
```

#### `jitoGodmode.ts`
**Purpose**: MEV-protected Solana execution  
**Exports**: `executeJitoTrade()`, `sendBundle()`  
**Dependencies**: @solana/web3.js, @jito-labs/sdk

```typescript
export async function executeJitoTrade(params: SolanaTradeParams) {
  // Bundle transactions for MEV protection
  // Tip calculation
  // Jito block engine submission
}
```

#### `whaleSniperV2.ts`
**Purpose**: Copy top wallet trades  
**Exports**: `monitorWallet()`, `copyTrade()`  
**Dependencies**: quadfectaEngine, tradeEngine

#### Data Source Libraries

| Library | API Provider | Purpose |
|---------|--------------|---------|
| `nansenAI.ts` | Nansen.ai | Smart money wallet labels |
| `duneAlpha.ts` | Dune Analytics | On-chain analytics queries |
| `debankAlpha.ts` | DeBank | Top wallet rankings |
| `arkham.ts` | Arkham Intel | Entity mapping |

---

## 🔧 Backend: `/server` Directory

Express.js API server and middleware.

```
server/
├── server.ts               # Main Express server
├── routes/
│   ├── trade.ts           # Trade execution endpoints
│   ├── health.ts          # Health check endpoint
│   └── signals.ts         # Signal data endpoints
└── middleware/
    ├── auth.ts            # API key authentication
    ├── cors.ts            # CORS configuration
    └── errorHandler.ts    # Global error handling
```

### Server Architecture

#### `server/server.ts`
Main server initialization:
```typescript
import express from 'express';
import mongoose from 'mongoose';
import tradeRoutes from './routes/trade';

const app = express();
const PORT = process.env.EXPRESS_SERVER_PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(authMiddleware);

// Routes
app.use('/api/trade', tradeRoutes);
app.use('/api/health', healthRoutes);

// Start
app.listen(PORT);
```

#### Routes

**`/api/trade`** - Trade execution
- `POST /api/trade/execute` - Execute a trade
- `GET /api/trade/history` - Get trade history
- `DELETE /api/trade/cancel` - Cancel pending order

**`/api/health`** - System status
- `GET /api/health` - Health check
- `GET /api/health/stats` - Detailed statistics

**`/api/signals`** - Data feeds
- `GET /api/signals/quadfecta/:token` - Get Quadfecta signals
- `GET /api/signals/whale/:address` - Whale wallet data

#### Middleware

**Authentication** (`auth.ts`)
```typescript
export function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
```

**CORS** (`cors.ts`)
```typescript
const allowedOrigins = [
  'http://localhost:3000',  // Dev
  process.env.NEXT_PUBLIC_API_URL  // Prod
];
```

---

## 🤖 Trading Bot: `/bot` Directory

Autonomous trading bot logic.

```
bot/
├── autoSniper.ts           # Main bot entry point
└── quadfectaSniper.ts      # Signal-based execution
```

### Bot Architecture

#### `autoSniper.ts`
Main bot process:
```typescript
// Initialize Telegram bot
// Connect to Quadfecta signals
// Monitor for opportunities
// Execute trades automatically
// Send notifications
```

**Environment Variables:**
- `AUTO_SNIPER_ENABLED` - Enable/disable bot
- `TELEGRAM_BOT_TOKEN` - Notification bot

#### `quadfectaSniper.ts`
Signal processing:
```typescript
export async function processSignals() {
  const signals = await quadfectaEngine.aggregateSignals(token);
  if (signals.confidence > THRESHOLD) {
    await tradeEngine.executeTrade({...});
    await sendTelegramAlert({...});
  }
}
```

---

## 🧪 Testing: `/tests` Directory

Complete test suite with Jest and React Testing Library.

```
tests/
├── backend/
│   └── tradeRoutes.spec.ts    # API endpoint tests
├── frontend/
│   ├── AlphaButton.spec.tsx   # Component tests
│   └── QuadfectaPanel.spec.tsx
└── spec/
    ├── env.spec.ts            # Environment validation
    └── helpers/
        ├── setup.ts           # Test configuration
        └── envVarHelpers.ts   # Test utilities
```

### Test Organization

| Directory | Purpose | Framework |
|-----------|---------|-----------|
| `backend/` | API & server tests | Jest + Supertest |
| `frontend/` | React component tests | Jest + React Testing Library |
| `spec/` | Unit & integration tests | Jest |

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing details.

---

## 📄 Configuration Files

### TypeScript Configuration

**`tsconfig.json`** - Main TypeScript config
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "jsx": "preserve",
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

**`tsconfig.jest.json`** - Jest-specific TypeScript config
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "jsx": "react-jsx",
    "module": "commonjs"
  }
}
```

### Testing Configuration

**`jest.config.ts`** - Jest test runner
- Test environment: jsdom
- Coverage collection
- Module path mapping
- Transform settings

**`jasmine.json`** - Legacy Jasmine config (deprecated)

### Package Configuration

**`package.json`** - npm scripts and dependencies
```json
{
  "scripts": {
    "dev": "next dev",
    "server": "tsx watch server/server.ts",
    "bot": "tsx bot/autoSniper.ts",
    "godmode": "concurrently \"npm run dev\" \"npm run server\" \"npm run bot\"",
    "test": "jest",
    "build": "next build"
  }
}
```

See [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md) for detailed config explanations.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.MD` | Project overview and quick start |
| `PROJECT_STRUCTURE.md` | This file - directory layout |
| `CONFIGURATION_GUIDE.md` | Config file explanations |
| `ENV_VARIABLES.md` | Environment variable reference |
| `DEVELOPMENT_SETUP.md` | Local development workflow |
| `TESTING_GUIDE.md` | Testing infrastructure |
| `DEPLOYMENT_GUIDE.md` | Production deployment |
| `PORT_ARCHITECTURE_EXPLAINED.md` | Frontend/Backend architecture |
| `TATUM_API_EXPLAINED.md` | Multi-chain API guide |
| `WALLET_SETUP_GUIDE.md` | Wallet & RPC setup |
| `ENV_TEST_SUMMARY.md` | Environment testing results |

---

## 🗂️ Hidden Files & Directories

### Version Control
- `.git/` - Git repository
- `.gitignore` - Ignored files
- `.gitattributes` - Git attributes

### Build Artifacts (gitignored)
- `.next/` - Next.js build output
- `node_modules/` - npm dependencies
- `coverage/` - Test coverage reports
- `dist/` - Distribution builds

### Environment Files (gitignored)
- `.env` - Local environment variables
- `.env.local` - Local overrides
- `.env.production.local` - Production secrets

### IDE & Tools
- `.cursor/` - Cursor IDE settings
- `.vscode/` - VS Code settings (if present)
- `next-env.d.ts` - Next.js TypeScript definitions

---

## 📊 File Count Summary

```
Total Files: ~50+
├── Source Code: 30+
│   ├── TypeScript: 25+
│   ├── React/TSX: 8+
│   └── CSS: 1
├── Tests: 6+
├── Documentation: 12+
└── Configuration: 5+
```

---

## 🎯 Quick Navigation

**Adding Features:**
1. Frontend component → `/components` + test in `/tests/frontend`
2. Backend API → `/server/routes` + test in `/tests/backend`
3. Trading logic → `/lib` + test in `/tests/spec`
4. Bot functionality → `/bot`

**Finding Code:**
- UI components: `/components` and `/app`
- API endpoints: `/server/routes`
- Trading algorithms: `/lib`
- Tests: `/tests` (mirrors source structure)

**Configuration:**
- TypeScript: `tsconfig.json`
- Testing: `jest.config.ts`
- Dependencies: `package.json`
- Environment: `.env` (see `ENV_VARIABLES.md`)

---

## 🔍 Import Path Examples

```typescript
// Component imports (Next.js)
import AlphaButton from '@/components/AlphaButton';

// Library imports
import { executeTrade } from '@/lib/tradeEngine';
import { aggregateSignals } from '@/lib/quadfectaEngine';

// Server imports
import { authMiddleware } from '@/server/middleware/auth';

// Test imports
import { mockEnvVars } from '@/tests/spec/helpers/envVarHelpers';
```

The `@/` prefix is configured in `tsconfig.json`:
```json
"paths": { "@/*": ["./*"] }
```

---

## 📝 Best Practices

### File Naming
- **Components**: PascalCase (`AlphaButton.tsx`)
- **Libraries**: camelCase (`tradeEngine.ts`)
- **Tests**: Match source + `.spec` (`AlphaButton.spec.tsx`)
- **Configs**: lowercase (`jest.config.ts`)

### Directory Organization
- Keep related files together
- Mirror test structure to source structure
- Separate concerns (frontend/backend/bot/lib)
- Document complex modules with inline comments

### Code Location Guidelines
- **UI Logic**: `/components` or `/app`
- **Business Logic**: `/lib`
- **API Logic**: `/server/routes`
- **Automation**: `/bot`
- **Shared Types**: Create `/types` directory if needed
- **Utilities**: Create `/utils` directory if needed

---

**For detailed configuration explanations, see [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md)**
