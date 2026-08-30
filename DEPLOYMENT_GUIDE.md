# Deployment Guide

Complete guide for deploying OneClickAlpha to production environments.

---

## 📋 Table of Contents

- [Deployment Overview](#deployment-overview)
- [Platform Setup](#platform-setup)
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Render)](#backend-deployment-render)
- [Bot Deployment (VPS)](#bot-deployment-vps)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Troubleshooting](#troubleshooting)

---

## 🌍 Deployment Overview

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Production Stack                         │
└─────────────────────────────────────────────────────────────┘

Frontend (Vercel)
├── Domain: oneclickalpha.vercel.app
├── Port: 443 (HTTPS)
├── CDN: Global edge network
└── Env: NEXT_PUBLIC_API_URL

Backend (Render)
├── Domain: oneclickalpha-api.onrender.com
├── Port: 443 (HTTPS)
├── Region: US-East
└── Env: All API keys, MongoDB URI

Bot (DigitalOcean / VPS)
├── Location: Droplet/VM
├── Port: None (internal process)
├── Manager: PM2
└── Env: Same as backend + Telegram

Database (MongoDB Atlas)
├── Cloud: MongoDB Atlas
├── Region: US-East-1
├── Tier: M0 (Free) or M10 (Paid)
└── Backup: Automatic
```

### Deployment Checklist

- [ ] Frontend on Vercel
- [ ] Backend on Render
- [ ] Database on MongoDB Atlas
- [ ] Bot on VPS (optional)
- [ ] Environment variables configured
- [ ] Custom domains (optional)
- [ ] SSL certificates (automatic)
- [ ] Monitoring setup
- [ ] Backup strategy

---

## 🛠️ Platform Setup

### Required Accounts

1. **Vercel** (Frontend)
   - Sign up: https://vercel.com/signup
   - Free tier: Unlimited deploys
   - Cost: $0/month (Hobby) or $20/month (Pro)

2. **Render** (Backend)
   - Sign up: https://render.com/signup
   - Free tier: 750 hours/month
   - Cost: $0/month (Free) or $7/month (Starter)

3. **MongoDB Atlas** (Database)
   - Sign up: https://www.mongodb.com/cloud/atlas/register
   - Free tier: 512MB storage
   - Cost: $0/month (M0) or $57/month (M10)

4. **DigitalOcean** (Bot - Optional)
   - Sign up: https://www.digitalocean.com
   - Droplet: $6/month (basic)
   - Or use any VPS provider

---

## 🎨 Frontend Deployment (Vercel)

### Method 1: Vercel Dashboard (Recommended)

**Step 1: Connect Repository**
1. Go to https://vercel.com/dashboard
2. Click **"New Project"**
3. Select **"Import Git Repository"**
4. Authorize GitHub access
5. Select `ebk1996/OneClickAlpha-500M-2025`
6. Click **"Import"**

**Step 2: Configure Build Settings**
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**Step 3: Set Environment Variables**

Click **"Environment Variables"** and add:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

**Step 4: Deploy**
1. Click **"Deploy"**
2. Wait for build (2-3 minutes)
3. Get deployment URL: `oneclickalpha.vercel.app`

**Step 5: Custom Domain (Optional)**
1. Go to **Project Settings** → **Domains**
2. Add custom domain: `oneclickalpha.com`
3. Configure DNS (Vercel provides instructions)
4. SSL certificate auto-configured

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project directory
cd OneClickAlpha-500M-2025
vercel

# Follow prompts:
# ? Set up and deploy "~/OneClickAlpha-500M-2025"? [Y/n] y
# ? Which scope? Your Name
# ? Link to existing project? [y/N] n
# ? What's your project's name? oneclickalpha
# ? In which directory is your code located? ./

# Production deployment
vercel --prod
```

### Vercel Configuration File (Optional)

Create `vercel.json` for advanced config:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api-url"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### Continuous Deployment

**Automatic deployments on push:**
1. Push to `main` branch
2. Vercel auto-detects changes
3. Builds and deploys automatically
4. ~2-3 minutes per deployment

```bash
git add .
git commit -m "feat: update dashboard UI"
git push origin main
# Vercel automatically deploys
```

---

## ⚙️ Backend Deployment (Render)

### Step 1: Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repository
4. Select `OneClickAlpha-500M-2025`

### Step 2: Configure Service

**Basic Settings:**
```
Name: oneclickalpha-backend
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave empty)
Runtime: Node
```

**Build & Start Commands:**
```
Build Command: npm install
Start Command: npm run server
```

**Instance Type:**
```
Free (512MB RAM, sleeps after inactivity)
or
Starter ($7/mo - 512MB RAM, always on)
```

### Step 3: Environment Variables

Add these in Render dashboard:

```bash
# Server
NODE_ENV=production
PORT=3001

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/oneclickalpha

# Authentication
API_KEY=your_production_api_key_secure

# Blockchain RPCs
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SOLANA_RPC=https://rpc.jito.wtf

# Private Keys (for bot execution)
PRIVATE_KEY=0xYOUR_ETHEREUM_PRIVATE_KEY
SOLANA_PRIVATE_KEY=YOUR_SOLANA_BASE58_KEY

# Data Providers
NANSEN_API_KEY=your_nansen_key
DUNE_API_KEY=your_dune_key
DEBANK_API_KEY=your_debank_key

# Notifications
TELEGRAM_BOT_TOKEN=your_telegram_token

# Feature Flags
AUTO_SNIPER_ENABLED=true
ENABLE_NANSEN=true
ENABLE_TATUM=false
ENABLE_ALCHEMY=true
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for build (~3-5 minutes)
3. Service URL: `https://oneclickalpha-api.onrender.com`

### Step 5: Verify Deployment

```bash
# Health check
curl https://oneclickalpha-api.onrender.com/api/health

# Expected response:
# {"status":"ok","timestamp":"2025-01-15T12:00:00.000Z"}
```

### Render Configuration File (Optional)

Create `render.yaml`:

```yaml
services:
  - type: web
    name: oneclickalpha-backend
    env: node
    region: oregon
    plan: starter
    buildCommand: npm install
    startCommand: npm run server
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3001
      - key: MONGODB_URI
        sync: false
      - key: API_KEY
        sync: false
```

### Custom Domain (Optional)

1. Go to service **Settings** → **Custom Domains**
2. Add domain: `api.oneclickalpha.com`
3. Configure DNS CNAME:
   ```
   api.oneclickalpha.com → oneclickalpha-api.onrender.com
   ```
4. SSL auto-configured

---

## 🤖 Bot Deployment (VPS)

### Option 1: DigitalOcean Droplet

**Step 1: Create Droplet**
1. Go to https://cloud.digitalocean.com/droplets
2. Click **"Create Droplet"**
3. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($6/mo - 1GB RAM)
   - **Region**: Closest to your users
   - **SSH Keys**: Add your public key

**Step 2: Initial Server Setup**
```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Git
apt install -y git

# Create deployment user
adduser deploy
usermod -aG sudo deploy
su - deploy
```

**Step 3: Deploy Bot**
```bash
# Clone repository
git clone https://github.com/ebk1996/OneClickAlpha-500M-2025.git
cd OneClickAlpha-500M-2025

# Install dependencies
npm install

# Create .env file
nano .env
# Paste production environment variables
# Save and exit (Ctrl+X, Y, Enter)

# Build TypeScript (if needed)
npm run build

# Start bot with PM2
pm2 start bot/autoSniper.ts --name alpha-bot --interpreter tsx

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the generated command
```

**Step 4: Manage Bot**
```bash
# View logs
pm2 logs alpha-bot

# Restart bot
pm2 restart alpha-bot

# Stop bot
pm2 stop alpha-bot

# Monitor performance
pm2 monit

# List all processes
pm2 list
```

### Option 2: Render Background Worker

**Alternative to VPS:**

1. In Render dashboard, click **"New +"** → **"Background Worker"**
2. Configure:
   ```
   Name: alpha-bot
   Build Command: npm install
   Start Command: npm run bot
   ```
3. Add same environment variables as backend
4. Deploy

**Note:** Background workers on Render are $7/mo (Starter plan).

---

## 🗄️ Database Setup

### MongoDB Atlas

**Step 1: Create Cluster**
1. Go to https://cloud.mongodb.com
2. Click **"Build a Database"**
3. Choose **"Shared"** (Free tier)
4. Select cloud provider & region (AWS US-East-1 recommended)
5. Cluster name: `OneclickAlpha`
6. Click **"Create"**

**Step 2: Create Database User**
1. Security → Database Access
2. Click **"Add New Database User"**
3. Username: `alphauser`
4. Password: Generate secure password (save it!)
5. Privileges: **"Read and write to any database"**
6. Click **"Add User"**

**Step 3: Configure Network Access**
1. Security → Network Access
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Or add specific IPs (Render, Vercel, VPS IPs)
4. Click **"Confirm"**

**Step 4: Get Connection String**
1. Click **"Connect"** on cluster
2. Choose **"Connect your application"**
3. Copy connection string:
   ```
   mongodb+srv://alphauser:<password>@oneclickalpha.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with actual password
5. Add database name: `.../oneclickalpha?retryWrites...`

**Step 5: Test Connection**
```bash
# Using mongosh
mongosh "mongodb+srv://alphauser:password@cluster.mongodb.net/oneclickalpha"

# Or test in your app
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_CONNECTION_STRING').then(() => console.log('✓ Connected')).catch(e => console.error('✗ Error:', e));"
```

---

## 🔐 Environment Variables

### Production Values

**Frontend (Vercel):**
```bash
NEXT_PUBLIC_API_URL=https://oneclickalpha-api.onrender.com
```

**Backend (Render) & Bot (VPS):**
```bash
# Server
NODE_ENV=production
PORT=3001
API_KEY=GENERATE_SECURE_32_CHAR_KEY_HERE

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/oneclickalpha

# Ethereum
PRIVATE_KEY=0xYOUR_ETHEREUM_WALLET_PRIVATE_KEY
ALCHEMY_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# Solana
SOLANA_PRIVATE_KEY=YOUR_SOLANA_WALLET_BASE58_KEY
SOLANA_RPC=https://rpc.jito.wtf

# Data APIs
NANSEN_API_KEY=YOUR_NANSEN_API_KEY
DUNE_API_KEY=YOUR_DUNE_API_KEY
DEBANK_API_KEY=YOUR_DEBANK_API_KEY
TATUM_API_KEY=t-YOUR_TATUM_API_KEY

# Telegram
TELEGRAM_BOT_TOKEN=7XXXXXXXXX:XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Feature Flags
AUTO_SNIPER_ENABLED=true
ENABLE_NANSEN=true
ENABLE_ALCHEMY=true
ENABLE_TATUM=false
```

### Security Best Practices

**DO:**
- ✅ Use platform secret management (Vercel/Render env vars)
- ✅ Generate strong API keys (32+ characters)
- ✅ Use separate keys for dev/staging/production
- ✅ Rotate keys regularly (quarterly)
- ✅ Use separate wallets for bot (not main holdings)
- ✅ Start with small test amounts

**DON'T:**
- ❌ Never commit secrets to Git
- ❌ Don't use production keys in development
- ❌ Don't share keys in Slack/Discord
- ❌ Don't reuse keys across projects
- ❌ Don't use weak API keys (< 10 chars)

---

## 🔄 CI/CD Pipeline

### Automatic Deployments

**Vercel (Frontend):**
```bash
# Push to main
git push origin main
# → Automatically deploys to production

# Push to dev branch
git push origin dev
# → Automatically deploys to preview URL
```

**Render (Backend):**
```bash
# Push to main
git push origin main
# → Automatically rebuilds and redeploys

# Manual deployment
# Dashboard → Manual Deploy → Deploy latest commit
```

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📊 Monitoring & Maintenance

### Health Checks

**Backend Health Endpoint:**
```bash
# Check backend is running
curl https://oneclickalpha-api.onrender.com/api/health

# Setup uptime monitoring (UptimeRobot, Pingdom)
# Monitor: https://oneclickalpha-api.onrender.com/api/health
# Interval: 5 minutes
# Alert: Email/SMS on downtime
```

### Logs

**Vercel Logs:**
1. Dashboard → Project → Deployments
2. Click deployment → **View Function Logs**
3. Real-time logs for errors

**Render Logs:**
1. Dashboard → Service → Logs
2. Real-time streaming logs
3. Search and filter

**Bot Logs (PM2):**
```bash
# View logs
pm2 logs alpha-bot

# Last 100 lines
pm2 logs alpha-bot --lines 100

# Follow logs
pm2 logs alpha-bot --lines 0
```

### Performance Monitoring

**Recommended Tools:**
- **Sentry** - Error tracking (https://sentry.io)
- **LogRocket** - Session replay (https://logrocket.com)
- **New Relic** - APM (https://newrelic.com)

### Backup Strategy

**Database Backups (MongoDB Atlas):**
- Automatic daily backups (Pro tier)
- Manual backup: Database → Backup → Create Backup
- Export collections: `mongodump --uri="CONNECTION_STRING"`

**Code Backups:**
- Git repository is source of truth
- Tag releases: `git tag v1.0.0 && git push --tags`

---

## 🔧 Troubleshooting

### Frontend Issues

**Build Failures:**
```bash
# Check build logs in Vercel
# Common issues:
# - Missing environment variables
# - Type errors
# - Import path errors

# Test build locally
npm run build
```

**Runtime Errors:**
```bash
# Check Vercel function logs
# Look for uncaught exceptions
# Verify NEXT_PUBLIC_API_URL is correct
```

### Backend Issues

**Service Won't Start:**
```bash
# Check Render logs
# Common issues:
# - Missing dependencies
# - MongoDB connection failure
# - Port conflicts

# Verify MongoDB URI
mongosh "YOUR_MONGODB_URI"
```

**API Returns 500:**
```bash
# Check Render logs for stack traces
# Verify all environment variables are set
# Check MongoDB connection
```

### Bot Issues

**Bot Not Executing Trades:**
```bash
# Check PM2 logs
pm2 logs alpha-bot

# Common issues:
# - AUTO_SNIPER_ENABLED=false
# - Insufficient wallet balance
# - Invalid private keys
# - RPC connection issues

# Restart bot
pm2 restart alpha-bot
```

**High Memory Usage:**
```bash
# Monitor with PM2
pm2 monit

# If memory leak, restart daily
pm2 restart alpha-bot --cron "0 0 * * *"
```

---

## ✅ Post-Deployment Checklist

- [ ] Frontend accessible at production URL
- [ ] Backend health check passes
- [ ] Database connection works
- [ ] Bot is running (if enabled)
- [ ] Environment variables secure
- [ ] SSL certificates active (HTTPS)
- [ ] Monitoring setup
- [ ] Error tracking configured
- [ ] Backup strategy implemented
- [ ] Documentation updated
- [ ] Team notified

---

**For environment variables, see [ENV_VARIABLES.md](ENV_VARIABLES.md)**  
**For local development, see [DEVELOPMENT_SETUP.md](DEVELOPMENT_SETUP.md)**  
**For architecture details, see [PORT_ARCHITECTURE_EXPLAINED.md](PORT_ARCHITECTURE_EXPLAINED.md)**
