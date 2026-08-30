# Telegram Bot Setup Guide

Complete guide to configure and run your OneClickAlpha Telegram bot for real-time notifications and command execution.

---

## 🚀 Quick Start

1. **Create a bot** with BotFather
2. **Get your bot token**
3. **Set `TELEGRAM_BOT_TOKEN` in `.env.local`**
4. **Enable auto-sniper**: `AUTO_SNIPER_ENABLED=true`
5. **Start the bot**: `npm run bot` or included in `npm run godmode`

---

## 📋 Step-by-Step Setup

### Step 1: Create Your Bot with BotFather

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** with BotFather
3. **Send the command**: `/newbot`
4. **Follow the prompts**:
   - Bot name: e.g., "OneClickAlpha Bot" or "OneClickAlpha Sniper"
   - Bot username: e.g., "oneclickalpha_bot" (must be unique and end with `_bot`)

**BotFather will respond with your bot token:**
```
Congratulations on your new bot. You will find it at https://t.me/your_bot_username. You can now add a description, about section and profile picture for your bot, see /help for a list of commands.

Use this token to access the HTTP API:
7123456789:ABCDefGhIJKlmnOPqrsTUvWxyz1234567890
```

### Step 2: Add Your Bot Token to Environment

Copy the token from BotFather and add it to `.env.local`:

```bash
TELEGRAM_BOT_TOKEN=7123456789:ABCDefGhIJKlmnOPqrsTUvWxyz1234567890
```

### Step 3: Optional - Customize Your Bot Profile

In your Telegram chat with BotFather, you can:

#### Set Bot Description
```
/setdescription
<Select your bot>
Real-time sniping alerts and trading signals for crypto
```

#### Set Bot Commands Menu
```
/setcommands
<Select your bot>
start - Start receiving alerts
stop - Stop receiving alerts
status - Check bot status
help - Get help
```

#### Set Bot Picture
```
/setuserpic
<Select your bot>
<Upload an image>
```

---

## 🔧 Configuration

### Environment Variables

**Required:**
- `TELEGRAM_BOT_TOKEN` - Your bot token from BotFather (minimum 10 characters)

**Optional:**
- `AUTO_SNIPER_ENABLED` - Enable auto-sniper bot (`true` or `false`, default: `false`)

**Example `.env.local`:**
```bash
# Telegram
TELEGRAM_BOT_TOKEN=7123456789:ABCDefGhIJKlmnOPqrsTUvWxyz1234567890

# Features
AUTO_SNIPER_ENABLED=true
ENABLE_NANSEN=true
ENABLE_TATUM=true
ENABLE_ALCHEMY=true

# Data APIs
NANSEN_API_KEY=your_nansen_key
TATUM_API_KEY=your_tatum_key
DUNE_API_KEY=your_dune_key
DEBANK_API_KEY=your_debank_key
```

---

## 🤖 How the Bot Works

### Auto-Sniper Bot (`app/bot/autoSniper.ts`)

The bot monitors the market and sends alerts when:

1. **Whale signals detected** (Arkham Intelligence)
   - Large token purchases/sales by tracked wallets
   - Unusual trading volume

2. **Smart money movement** (Nansen)
   - Smart money inflows
   - Alpha wallets making moves

3. **Insider clusters** (Dune Analytics)
   - Coordinated buys/sells
   - Insider pattern detection

4. **Hidden PnL opportunities** (DeBank)
   - Wallets with high PnL potential
   - Emerging alpha tokens

5. **Quadfecta signals** (Combined)
   - When ALL four signals align (highest confidence)

### Message Format

Example alert:

```
🚨 WHALE ALERT
━━━━━━━━━━━━━━━━━━━━━━
Token: $AIFLOW
Price: $0.025
Confidence: 97%
Signal: Arkham Whale 🐋
━━━━━━━━━━━━━━━━━━━━━━
📊 Enter /execute to trade
```

---

## 🎮 Commands

Once your bot is running and you've started it in Telegram:

### `/start`
Start receiving alerts from the bot.

### `/stop`
Disable alerts (no more messages until `/start`).

### `/status`
Get current bot status:
- ✅ Connected
- 📊 Signals enabled
- ⚠️ Any configuration warnings

### `/help`
Display available commands and guide.

### `/execute`
(When available during an alert) Execute the suggested trade.

### `/settings`
Configure bot behavior:
- Alert frequency
- Confidence threshold
- Token filters
- Notification preferences

---

## 📊 Real-Time Monitoring

### What the Bot Monitors

| Signal | Source | Frequency | Alert Type |
|--------|--------|-----------|-----------|
| **Whale Movements** | Arkham | Real-time | 🐋 Critical |
| **Smart Money** | Nansen | Real-time | 🧠 High |
| **Dune Clusters** | Dune Analytics | Every 5 min | 📈 Medium |
| **DeBank PnL** | DeBank | Every 10 min | 💰 Opportunity |
| **Quadfecta** | All 4 combined | When aligned | 🎯 Max Confidence |

---

## 🚀 Running the Bot

### Option 1: Standalone Bot
```bash
npm run bot
```

Runs `bot/autoSniper.ts` independently. Bot listens for messages and sends alerts to your chat.

### Option 2: Full God Mode (Recommended for Development)
```bash
npm run godmode
```

Starts concurrently:
- Next.js frontend (`npm run dev`)
- Express server (`npm run server`)
- Auto-sniper bot (`npm run bot`)

All three services running with hot-reload.

### Option 3: Production with PM2
```bash
npm install -g pm2

pm2 start npm --name "alpha-bot" -- run bot
pm2 start npm --name "alpha-server" -- run server
pm2 start npm --name "alpha-frontend" -- run dev

pm2 save
pm2 startup
```

---

## 🔌 API Endpoints

Once the server is running, you can trigger bot actions via API:

### Send Alert Manually
```bash
POST http://localhost:3001/api/bot/alert
Content-Type: application/json
x-api-key: your_api_key

{
  "message": "🐋 Whale Alert: 1000 ETH deposited",
  "signal": "whale",
  "confidence": 98
}
```

### Get Bot Status
```bash
GET http://localhost:3001/api/bot/status
x-api-key: your_api_key
```

Response:
```json
{
  "connected": true,
  "enabled": true,
  "subscribers": 42,
  "lastAlert": "2025-12-14T10:45:23Z",
  "signalsToday": 127
}
```

---

## 🐛 Troubleshooting

### Bot Not Responding

**Check if token is set:**
```bash
echo $TELEGRAM_BOT_TOKEN
# Should print your token, not empty
```

**Verify token format:**
- Must start with a number (e.g., `7123456789:ABC...`)
- Must be 45+ characters long
- Should not contain quotes or spaces

**Restart bot:**
```bash
npm run bot
```

Look for output like:
```
✅ Bot connected successfully
🤖 Listening for messages...
📡 Auto-sniper enabled
```

---

### No Alerts Received

1. **Start the bot** in Telegram: `/start`
2. **Check `AUTO_SNIPER_ENABLED=true`** in `.env.local`
3. **Verify API keys** are set:
   - `NANSEN_API_KEY`
   - `TATUM_API_KEY`
   - `DUNE_API_KEY`
   - `DEBANK_API_KEY`
4. **Check server logs** for errors:
   ```bash
   npm run server
   ```

### Token Invalid

**Get a new token:**
1. Chat with `@BotFather`
2. `/mybots` → Select your bot → API Token
3. Click "Regenerate token" if compromised
4. Update `.env.local`

---

## 🔒 Security Best Practices

### Protect Your Bot Token

⚠️ **NEVER commit your token to git:**

```bash
# .env.local (not committed)
TELEGRAM_BOT_TOKEN=your_real_token

# .env.example (safe to commit)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

### Restrict Bot Permissions

In BotFather, you can limit what your bot can do:

```
/setprivacy
<Select your bot>
Enable - Bot can see messages
Disable - Bot cannot see group messages (default)
```

**Recommendation**: Keep it **Disabled** for groups, **Enabled** for private chats.

### API Key Protection

If sharing your bot with others, use API key validation:

```bash
# In server/server.ts middleware
if (req.headers['x-api-key'] !== process.env.API_KEY) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## 📞 Support & Debugging

### Enable Debug Logging

Update `app/bot/autoSniper.ts` to log more info:

```typescript
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Enable debug logging
bot.on('message', (ctx) => {
  console.log('📨 Message received:', ctx.message);
  // ... rest of handler
});
```

### View Bot Logs

```bash
npm run bot 2>&1 | tee bot.log
```

This saves all output to `bot.log` for later review.

### Test Bot Locally

Create a test script:

```typescript
// test/telegram.test.ts
import axios from 'axios';

const token = process.env.TELEGRAM_BOT_TOKEN;

async function testBot() {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${token}/getMe`
    );
    console.log('✅ Bot is valid:', response.data.result.first_name);
  } catch (error) {
    console.error('❌ Bot token invalid');
  }
}

testBot();
```

Run with:
```bash
npx ts-node test/telegram.test.ts
```

---

## 🎓 Advanced Configuration

### Custom Alert Thresholds

Edit `app/bot/autoSniper.ts`:

```typescript
// Only alert if confidence > 95
const CONFIDENCE_THRESHOLD = 95;

// Only alert for tokens with > $1M liquidity
const LIQUIDITY_THRESHOLD = 1_000_000;

// Max 5 alerts per hour per signal type
const RATE_LIMIT = 5;
```

### Multi-Chat Support

Send alerts to multiple channels:

```typescript
const chatIds = [
  process.env.TELEGRAM_CHAT_ID_1,
  process.env.TELEGRAM_CHAT_ID_2,
];

for (const chatId of chatIds) {
  await bot.telegram.sendMessage(chatId, message);
}
```

---

## 📚 Resources

- **Telegram Bot API**: https://core.telegram.org/bots/api
- **Telegraf Library**: https://telegraf.js.org/
- **BotFather**: `@BotFather` on Telegram
- **Telegram Docs**: https://core.telegram.org/

---

## ✅ Checklist

- [ ] Created bot with BotFather (`@BotFather`)
- [ ] Copied bot token to `.env.local`
- [ ] Set `AUTO_SNIPER_ENABLED=true`
- [ ] Configured API keys (Nansen, Tatum, Dune, DeBank)
- [ ] Started bot: `npm run bot`
- [ ] Started chat with your bot on Telegram
- [ ] Sent `/start` command to bot
- [ ] Received test alert or status message
- [ ] (Optional) Customized bot profile (name, description, commands)

---

**You're all set! Your OneClickAlpha bot is now live. Happy sniping! 🚀**
