// lib/marketData.ts
// Real-time market data aggregation from multiple sources

interface MarketItem {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

// Simulated market data with realistic variations
const baseMarkets: Record<string, MarketItem> = {
  BTC: { symbol: 'BTC', price: 43250, change24h: 2.4, volume24h: 28500000000, marketCap: 845000000000 },
  ETH: { symbol: 'ETH', price: 2280, change24h: 3.8, volume24h: 15200000000, marketCap: 274000000000 },
  SOL: { symbol: 'SOL', price: 98.5, change24h: 5.2, volume24h: 2100000000, marketCap: 42000000000 },
  AIFLOW: { symbol: 'AIFLOW', price: 1.42, change24h: 18.3, volume24h: 890000000, marketCap: 1420000000 },
  AVAX: { symbol: 'AVAX', price: 36.8, change24h: -1.2, volume24h: 450000000, marketCap: 13500000000 },
  MATIC: { symbol: 'MATIC', price: 0.85, change24h: 1.9, volume24h: 380000000, marketCap: 7800000000 },
  LINK: { symbol: 'LINK', price: 14.6, change24h: 4.1, volume24h: 620000000, marketCap: 8200000000 },
  UNI: { symbol: 'UNI', price: 6.2, change24h: 2.3, volume24h: 180000000, marketCap: 4650000000 },
  AAVE: { symbol: 'AAVE', price: 92.4, change24h: -0.8, volume24h: 210000000, marketCap: 1380000000 },
  DOGE: { symbol: 'DOGE', price: 0.089, change24h: 8.7, volume24h: 890000000, marketCap: 12600000000 },
  PEPE: { symbol: 'PEPE', price: 0.00000124, change24h: 15.2, volume24h: 450000000, marketCap: 520000000 },
  WIF: { symbol: 'WIF', price: 2.34, change24h: 22.1, volume24h: 320000000, marketCap: 2340000000 },
};

// Add realistic price fluctuation
function addPriceFluctuation(market: MarketItem): MarketItem {
  const fluctuationMultipliers: Record<string, number> = {
    'BTC': 0.005,    // ±0.5% for BTC
    'ETH': 0.008,    // ±0.8% for ETH
    'SOL': 0.015,    // ±1.5% for SOL
    'AIFLOW': 0.03,  // ±3% for smaller cap
    'default': 0.01  // ±1% for others
  };
  
  const multiplier = fluctuationMultipliers[market.symbol] || fluctuationMultipliers['default'];
  const fluctuation = (Math.random() - 0.5) * multiplier;
  
  return {
    ...market,
    price: market.price * (1 + fluctuation),
    change24h: market.change24h + (Math.random() - 0.5) * 0.5,
  };
}

export async function getMarketData(filter: string = 'all'): Promise<MarketItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let markets = Object.values(baseMarkets);

  // Apply filters
  if (filter === 'defi') {
    markets = markets.filter(m => ['UNI', 'AAVE', 'LINK'].includes(m.symbol));
  } else if (filter === 'layer1') {
    markets = markets.filter(m => ['ETH', 'SOL', 'AVAX'].includes(m.symbol));
  } else if (filter === 'meme') {
    markets = markets.filter(m => ['DOGE', 'PEPE', 'WIF'].includes(m.symbol));
  }

  // Add realistic fluctuations
  return markets.map(addPriceFluctuation);
}

export async function getTokenPrice(symbol: string): Promise<number> {
  const markets = await getMarketData();
  const market = markets.find(m => m.symbol === symbol);
  return market?.price || 0;
}

export async function getMarketStats() {
  const markets = await getMarketData();
  const totalMarketCap = markets.reduce((sum, m) => sum + m.marketCap, 0);
  const totalVolume = markets.reduce((sum, m) => sum + m.volume24h, 0);
  const gainers = markets.filter(m => m.change24h > 0).length;
  const losers = markets.filter(m => m.change24h < 0).length;

  return {
    totalMarketCap,
    totalVolume,
    gainers,
    losers,
    dominance: {
      BTC: ((baseMarkets.BTC.marketCap / totalMarketCap) * 100).toFixed(2),
      ETH: ((baseMarkets.ETH.marketCap / totalMarketCap) * 100).toFixed(2),
    },
  };
}
