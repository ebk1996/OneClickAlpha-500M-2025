# Port Architecture - Frontend vs Backend

Detailed explanation of why frontend and backend run on different ports locally but deploy to different domains in production.

---
a
## 🎯 The Core Concept

**Frontend** (Next.js) and **Backend** (Express) are **separate applications** that communicate via HTTP/API calls. They need different ports to avoid conflicts.

---

## 🏠 Local Development (Different Ports)

### Port Assignment

```bash
Frontend (Next.js):  http://localhost:3000
Backend (Express):   http://localhost:3001
```

### Why Different Ports Locally?

1. **They're separate processes**
   - Next.js runs its own Node.js server
   - Express runs its own Node.js server
   - Both can't listen on the same port simultaneously

2. **Independent development**
   - You can restart backend without affecting frontend
   - You can work on API without rebuilding UI
   - Easier debugging (separate console logs)

3. **Clear separation of concerns**
   - Frontend: UI rendering, client-side logic
   - Backend: API, database, trading logic

### How They Communicate Locally

```javascript
// In your Next.js frontend component
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function executeTrade() {
  const response = await fetch(`${API_URL}/api/trade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 10000000 })
  });
}
```

**Flow:**
1. User clicks button in browser → `http://localhost:3000` (Frontend)
2. Frontend makes API call to → `http://localhost:3001/api/trade` (Backend)
3. Backend processes request and returns JSON
4. Frontend displays result

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",              // Starts Next.js on port 3000
    "server": "tsx watch server/server.ts", // Starts Express on port 3001
    "godmode": "concurrently \"npm run dev\" \"npm run server\" \"npm run bot\""
  }
}
```

`npm run godmode` runs **both** simultaneously using `concurrently`.

---

## 🌐 Production Deployment (Different Domains)

### Architecture

```
Frontend (Vercel):     https://oneclickalpha.vercel.app
Backend (Render):      https://oneclickalpha-api.onrender.com
Bot (DigitalOcean):    No public port (runs internally)
```

### Why Different Domains?

1. **Platform specialization**
   - **Vercel** = Optimized for Next.js (CDN, edge functions, static optimization)
   - **Render** = Optimized for long-running Node.js servers (database connections, 24/7 uptime)
   - **DigitalOcean** = Full server control for trading bot

2. **Scalability**
   - Frontend can scale independently (millions of page views)
   - Backend can scale independently (thousands of API requests)
   - Each service has its own resources

3. **Cost optimization**
   - Vercel free tier for static frontend
   - Render paid tier only for backend API
   - Bot runs on cheap $6/mo droplet

4. **Security**
   - API keys stored only in backend environment
   - Private keys never exposed to frontend
   - Separate rate limiting and CORS policies

### Port Configuration in Production

#### Frontend (Vercel)
- **Port**: Handled automatically by Vercel (always HTTPS port 443)
- **Environment Variable**:
  ```bash
  NEXT_PUBLIC_API_URL=https://oneclickalpha-api.onrender.com
  ```
- **No port in URL** because HTTPS defaults to 443

#### Backend (Render)
- **Port**: Set by Render via `process.env.PORT` (not 3001)
- **server.ts**:
  ```javascript
  const PORT = process.env.PORT || 3001;
  // In production: Render sets PORT=10000 (or similar)
  // In local dev: Defaults to 3001
  ```
- **render.yaml**:
  ```yaml
  services:
    - type: web
      name: oneclickalpha-backend
      envVars:
        - key: PORT
          value: 3001  # This gets overridden by Render
  ```

**Important**: Render assigns its own port internally, but you access it via:
```
https://oneclickalpha-api.onrender.com/api/health
```
(No port number needed - HTTPS = port 443 externally)

---

## 🔄 The Same Port Question: "Do They End Up on the Same Port?"

### Short Answer: **No, but it doesn't matter**

### Why It Doesn't Matter

1. **Both use HTTPS (port 443) externally**
   ```
   Frontend: https://app.vercel.app:443  (port hidden)
   Backend:  https://api.onrender.com:443 (port hidden)
   ```
   - Different domains, same external port (443)
   - No conflict because different servers

2. **Internal ports are abstracted away**
   - Vercel/Render handle port mapping internally
   - You never specify ports in production URLs
   - Load balancers route traffic appropriately

3. **Your code doesn't care**
   ```javascript
   // Works in both dev and production
   const API_URL = process.env.NEXT_PUBLIC_API_URL;
   
   // Dev:  http://localhost:3001
   // Prod: https://oneclickalpha-api.onrender.com
   ```

---

## 🛠️ Could You Run Them on the Same Port?

### Technically, Yes - But Bad Idea

#### Option 1: Next.js API Routes (Not Recommended for This App)

Next.js has built-in API routes:
```javascript
// pages/api/trade.ts
export default async function handler(req, res) {
  // API logic here
}
```
- **Runs on same port** as frontend (3000)
- **Good for**: Simple APIs, serverless functions
- **Bad for**: Complex backends, database connections, trading bots
- **Why we don't use it**: Our Express server is too complex

#### Option 2: Reverse Proxy (Overcomplicated)

Use Nginx to proxy both services:
```
User → nginx:80 → {
  /         → Frontend:3000
  /api/*    → Backend:3001
}
```
- **Good for**: Microservices, single domain requirement
- **Bad for**: Our use case (separate deployments easier)

---

## 📊 Architecture Comparison

| Aspect | Local Dev | Production |
|--------|-----------|------------|
| **Frontend Port** | 3000 | 443 (HTTPS) |
| **Backend Port** | 3001 | 443 (HTTPS) |
| **Frontend URL** | localhost:3000 | vercel.app |
| **Backend URL** | localhost:3001 | onrender.com |
| **Communication** | Cross-origin (CORS) | Cross-origin (CORS) |
| **Same Process?** | No | No |
| **Same Server?** | Yes (your laptop) | No (different clouds) |

---

## 🔐 CORS Configuration

Since frontend and backend are on different origins, you need CORS:

```javascript
// server/server.ts
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://oneclickalpha.vercel.app'  // Production frontend
    : 'http://localhost:3000',             // Local frontend
  credentials: true
}));
```

This allows your frontend to make requests to your backend despite different domains/ports.

---

## 🚀 Deployment Flow

### 1. Local Development
```
Terminal 1: npm run dev      → Frontend on :3000
Terminal 2: npm run server   → Backend on :3001
Terminal 3: npm run bot      → Bot (no port)
```

### 2. Production Deployment

**Frontend (Vercel)**
```bash
git push origin main
→ Vercel auto-builds Next.js
→ Deployed to: https://your-app.vercel.app
→ Env var: NEXT_PUBLIC_API_URL=https://your-api.onrender.com
```

**Backend (Render)**
```bash
git push origin main
→ Render auto-builds Express server
→ Deployed to: https://your-api.onrender.com
→ Env vars: MONGODB_URI, PRIVATE_KEY, etc.
→ Render assigns PORT internally (you don't set it)
```

**Bot (DigitalOcean)**
```bash
ssh root@droplet-ip
git pull
pm2 restart alpha-bot
→ Runs on internal process (no public port)
```

---

## 🧪 Testing the Setup

### Local Test
```bash
# Terminal 1
npm run dev
# ✓ Next.js running on http://localhost:3000

# Terminal 2  
npm run server
# ✓ Express running on http://localhost:3001

# Terminal 3 - Test API
curl http://localhost:3001/api/health
# {"status":"ok","timestamp":"2025-01-15T12:00:00.000Z"}
```

### Production Test
```bash
# Test frontend
curl https://oneclickalpha.vercel.app
# Returns HTML

# Test backend
curl https://oneclickalpha-api.onrender.com/api/health
# {"status":"ok","timestamp":"2025-01-15T12:00:00.000Z"}
```

---

## ❓ Common Questions

### Q: Why not use Next.js API routes for everything?
**A**: Our Express backend has:
- Complex trading logic
- Database connections that persist
- WebSocket connections
- Bot integration
- Heavy processing that shouldn't run serverless

### Q: Can I deploy both to the same platform?
**A**: Yes, but not recommended:
- Vercel can host both, but backend becomes serverless (bad for persistent connections)
- Render can host both, but frontend won't get Vercel's edge CDN benefits

### Q: Do I need to specify port 443 in production URLs?
**A**: No - HTTPS automatically uses 443:
```
✓ https://api.onrender.com
✗ https://api.onrender.com:443 (redundant)
```

### Q: What if I want everything on localhost:3000?
**A**: Use Next.js API routes instead of Express - but you lose:
- Separate backend deployments
- Long-running processes
- Traditional Node.js server patterns

---

## 📚 Summary

**Local**: Different ports (3000 vs 3001) because different processes
**Production**: Different domains (vercel.app vs onrender.com) for platform optimization
**Both cases**: Frontend and backend are **separate applications** that communicate via HTTP

The key insight: **Ports matter locally, domains matter in production, but the architecture stays the same - separate frontend and backend services.**

---

## 🎓 Best Practices

✅ **Do**:
- Keep frontend and backend separate for flexibility
- Use environment variables for API URLs
- Configure CORS properly
- Let platforms handle port assignment in production

❌ **Don't**:
- Hardcode ports in frontend code
- Try to force everything onto one port
- Deploy frontend and backend to the same service (unless simple app)
- Commit port configurations to Git

---

**TL;DR**: They run on different ports locally (3000 vs 3001), deploy to different domains in production (vercel.app vs onrender.com), but both use HTTPS port 443 externally. The separation gives you flexibility, better deployment options, and clearer architecture. 🚀
