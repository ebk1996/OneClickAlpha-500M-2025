# Development Setup Guide

Complete guide for setting up and working with the OneClickAlpha project locally.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Running Services](#running-services)
- [Making Changes](#making-changes)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### Required Software

| Software | Minimum Version | Purpose | Installation |
|----------|----------------|---------|--------------|
| **Node.js** | 18.0.0+ | JavaScript runtime | https://nodejs.org |
| **npm** | 9.0.0+ | Package manager | Bundled with Node.js |
| **Git** | 2.0+ | Version control | https://git-scm.com |
| **MongoDB** | 6.0+ | Database | https://www.mongodb.com |

### Verify Installation

```bash
# Check Node.js version
node --version
# Expected: v18.0.0 or higher

# Check npm version
npm --version
# Expected: 9.0.0 or higher

# Check Git
git --version
# Expected: git version 2.x.x

# Check MongoDB (if running locally)
mongod --version
# Expected: db version v6.x.x
```

### Optional Tools

- **VS Code** - Recommended IDE (https://code.visualstudio.com)
- **MongoDB Compass** - Database GUI (https://www.mongodb.com/products/compass)
- **Postman** - API testing (https://www.postman.com)
- **React DevTools** - Browser extension for React debugging

---

## 🚀 Initial Setup

### 1. Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/ebk1996/OneClickAlpha-500M-2025.git

# Or via SSH (if you have SSH keys set up)
git clone git@github.com:ebk1996/OneClickAlpha-500M-2025.git

# Navigate to project directory
cd OneClickAlpha-500M-2025
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies from `package.json`:
- Production dependencies (Next.js, Express, MongoDB, etc.)
- Development dependencies (Jest, TypeScript, testing libraries)

**Expected output:**
```
added 1234 packages in 45s
```

**Troubleshooting:**
```bash
# If installation fails, try:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 3. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit with your favorite editor
nano .env
# or
code .env
```

**Minimum Required Variables:**
```bash
# Server
EXPRESS_SERVER_PORT=3001
NODE_ENV=development

# Authentication
API_KEY=your_secure_api_key_minimum_10_chars

# Database
MONGODB_URI=mongodb://localhost:27017/oneclickalpha

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Optional but Recommended:**
```bash
# Auto-sniper bot
AUTO_SNIPER_ENABLED=false
TELEGRAM_BOT_TOKEN=your_telegram_token

# Blockchain RPCs
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SOLANA_RPC=https://api.mainnet-beta.solana.com

# Data providers (for Quadfecta)
NANSEN_API_KEY=your_nansen_key
DUNE_API_KEY=your_dune_key
DEBANK_API_KEY=your_debank_key
```

See [ENV_VARIABLES.md](ENV_VARIABLES.md) for complete documentation.

### 4. Set Up Database

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Verify it's running
mongo --eval "db.adminCommand('ping')"
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env`:
   ```bash
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/oneclickalpha
   ```

### 5. Verify Setup

```bash
# Run tests to verify everything works
npm test

# Expected: All tests pass
# ✓ 15 tests passed
```

---

## 💻 Development Workflow

### Daily Workflow

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Start development environment
npm run godmode

# 4. Make changes, save files (hot reload)

# 5. Run tests
npm test

# 6. Commit and push
git add .
git commit -m "feat: add new trading strategy"
git push origin main
```

### Branch Workflow

```bash
# Create feature branch
git checkout -b feature/whale-alerts

# Make changes and commit
git add .
git commit -m "feat: implement whale alert system"

# Push to remote
git push origin feature/whale-alerts

# Create pull request on GitHub
# After review, merge to main
```

---

## 🎮 Running Services

### All Services (Godmode)

```bash
npm run godmode
```

**What it does:**
- Starts Next.js frontend on `http://localhost:3000`
- Starts Express backend on `http://localhost:3001`
- Starts auto-sniper bot (if enabled)

**Output:**
```
[0] > next dev
[0] ✓ Ready on http://localhost:3000
[1] > tsx watch server/server.ts
[1] ✓ Server listening on http://localhost:3001
[2] > tsx bot/autoSniper.ts
[2] ✓ Bot initialized
```

**Stop:** Press `Ctrl+C` once to stop all services.

### Individual Services

**Frontend Only**
```bash
npm run dev
```
- Access at: http://localhost:3000
- Hot module reload (HMR) enabled
- Auto-refresh on file changes

**Backend Only**
```bash
npm run server
```
- Access at: http://localhost:3001
- Watch mode enabled (auto-restart on changes)
- API endpoint: http://localhost:3001/api/health

**Bot Only**
```bash
npm run bot
```
- Runs in foreground
- Logs to console
- Requires `AUTO_SNIPER_ENABLED=true` in `.env`

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

---

## ✏️ Making Changes

### Frontend Development

**Location:** `/app` and `/components`

**Example: Create new component**

1. **Create component file**
   ```bash
   touch components/TradeHistory.tsx
   ```

2. **Implement component**
   ```typescript
   // components/TradeHistory.tsx
   export default function TradeHistory() {
     return (
       <div className="trade-history">
         <h2>Trade History</h2>
         {/* Component logic */}
       </div>
     );
   }
   ```

3. **Create test file**
   ```bash
   touch tests/frontend/TradeHistory.spec.tsx
   ```

4. **Write tests**
   ```typescript
   import { render, screen } from '@testing-library/react';
   import TradeHistory from '@/components/TradeHistory';

   it('should render trade history', () => {
     render(<TradeHistory />);
     expect(screen.getByText('Trade History')).toBeInTheDocument();
   });
   ```

5. **Use in page**
   ```typescript
   // app/page.tsx
   import TradeHistory from '@/components/TradeHistory';

   export default function Home() {
     return (
       <main>
         <TradeHistory />
       </main>
     );
   }
   ```

6. **View changes**
   - Save files
   - Browser auto-refreshes
   - Changes visible at http://localhost:3000

### Backend Development

**Location:** `/server`

**Example: Add new API endpoint**

1. **Create route file**
   ```bash
   touch server/routes/analytics.ts
   ```

2. **Implement route**
   ```typescript
   // server/routes/analytics.ts
   import { Router } from 'express';

   const router = Router();

   router.get('/stats', async (req, res) => {
     try {
       const stats = {
         totalTrades: 100,
         profitLoss: 5000
       };
       res.json(stats);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   export default router;
   ```

3. **Register route**
   ```typescript
   // server/server.ts
   import analyticsRoutes from './routes/analytics';
   
   app.use('/api/analytics', analyticsRoutes);
   ```

4. **Create test**
   ```bash
   touch tests/backend/analyticsRoutes.spec.ts
   ```

5. **Test endpoint**
   ```bash
   curl http://localhost:3001/api/analytics/stats
   ```

### Library Development

**Location:** `/lib`

**Example: Add new trading strategy**

1. **Create library file**
   ```bash
   touch lib/momentumStrategy.ts
   ```

2. **Implement logic**
   ```typescript
   // lib/momentumStrategy.ts
   export async function analyzeMomentum(token: string) {
     // Trading logic
     return { signal: 'buy', confidence: 0.85 };
   }
   ```

3. **Write tests**
   ```bash
   touch tests/spec/momentumStrategy.spec.ts
   ```

4. **Import in engine**
   ```typescript
   // lib/quadfectaEngine.ts
   import { analyzeMomentum } from './momentumStrategy';
   ```

---

## 🐛 Debugging

### Frontend Debugging (Browser)

**Chrome DevTools:**
1. Open browser DevTools (`F12`)
2. Navigate to **Sources** tab
3. Find file in file tree
4. Add breakpoints
5. Trigger functionality
6. Step through code

**React DevTools:**
1. Install React DevTools extension
2. Open DevTools → **React** tab
3. Inspect component tree
4. View props and state
5. Profile performance

**Console Logging:**
```typescript
console.log('Debug:', { variable, state });
console.table(arrayOfObjects);
console.time('operation');
// ... code
console.timeEnd('operation');
```

### Backend Debugging (Node.js)

**Console Logging:**
```typescript
console.log('[DEBUG] Trade params:', params);
console.error('[ERROR]', error.stack);
```

**VS Code Debugger:**

1. Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Debug Server",
         "type": "node",
         "request": "launch",
         "runtimeExecutable": "npm",
         "runtimeArgs": ["run", "server"],
         "skipFiles": ["<node_internals>/**"]
       }
     ]
   }
   ```

2. Set breakpoints in code
3. Press `F5` to start debugging
4. Step through code with `F10`/`F11`

**Node Inspector:**
```bash
# Start server with inspector
node --inspect server/server.ts

# Open chrome://inspect in Chrome
# Click "inspect" on your process
```

### Test Debugging

**Run single test:**
```bash
npx jest tests/backend/tradeRoutes.spec.ts --verbose
```

**Debug test in VS Code:**
```json
{
  "name": "Debug Jest Tests",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--runInBand", "--no-coverage"],
  "console": "integratedTerminal"
}
```

---

## 🔨 Common Tasks

### Adding a New Dependency

```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name

# Update package.json manually, then:
npm install
```

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages (minor/patch)
npm update

# Update specific package
npm install package-name@latest

# Update major versions (carefully!)
npm install package-name@next
```

### Database Operations

**Reset database:**
```bash
# MongoDB shell
mongo

# Switch to database
use oneclickalpha

# Drop all collections
db.dropDatabase()
```

**Seed data:**
```bash
# Create seed script: scripts/seed.ts
npm run seed
```

### Linting & Formatting

```bash
# Run ESLint (if configured)
npx eslint .

# Auto-fix issues
npx eslint . --fix

# Format with Prettier (if installed)
npx prettier --write .
```

---

## 🔧 Troubleshooting

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Fix:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3002 npm run dev
```

### Module Not Found

**Error:**
```
Cannot find module '@/components/Button'
```

**Fix:**
1. Check file exists: `ls components/Button.tsx`
2. Check import path is correct
3. Restart dev server: `Ctrl+C` then `npm run godmode`
4. Clear Next.js cache: `rm -rf .next`

### Environment Variables Not Loading

**Error:**
```
process.env.API_KEY is undefined
```

**Fix:**
1. Verify `.env` file exists
2. Check variable names (no typos)
3. Restart server (env vars loaded on startup)
4. For frontend vars, use `NEXT_PUBLIC_` prefix

### Database Connection Failed

**Error:**
```
MongoServerError: connect ECONNREFUSED 127.0.0.1:27017
```

**Fix:**
```bash
# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS

# Verify MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Check MONGODB_URI in .env
```

### Tests Failing

**Error:**
```
FAIL tests/backend/tradeRoutes.spec.ts
```

**Fix:**
1. Run single test: `npx jest path/to/test.spec.ts`
2. Check test logs for details
3. Verify test setup/teardown
4. Check mocked data is correct
5. Clear Jest cache: `npx jest --clearCache`

---

## 📚 Additional Resources

- **Project Documentation**: See all `*.md` files in project root
- **Next.js Docs**: https://nextjs.org/docs
- **Express Docs**: https://expressjs.com
- **MongoDB Docs**: https://docs.mongodb.com
- **TypeScript Handbook**: https://www.typescriptlang.org/docs

---

## ✅ Development Checklist

Before committing:

- [ ] Code runs without errors
- [ ] All tests pass (`npm test`)
- [ ] No console errors in browser
- [ ] Environment variables documented (if added)
- [ ] Code follows existing patterns
- [ ] Git status clean (no unwanted files)
- [ ] Commit message is descriptive

---

**For configuration details, see [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md)**  
**For testing workflow, see [TESTING_GUIDE.md](TESTING_GUIDE.md)**  
**For deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**
