// lib/portfolio.ts
// Portfolio management and analytics

interface Holding {
  token: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercent: number;
  entryPrice: number;
  currentPrice: number;
}

interface PortfolioStats {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  bestPerformer: string;
  worstPerformer: string;
  holdings: Holding[];
}

// Simulated portfolio holdings
const mockHoldings = [
  { token: 'ETH', amount: 12.5, entryPrice: 1850, currentPrice: 2280 },
  { token: 'BTC', amount: 0.85, entryPrice: 38000, currentPrice: 43250 },
  { token: 'SOL', amount: 450, entryPrice: 78, currentPrice: 98.5 },
  { token: 'AIFLOW', amount: 50000, entryPrice: 0.45, currentPrice: 1.42 },
  { token: 'LINK', amount: 1200, entryPrice: 12.5, currentPrice: 14.6 },
  { token: 'AVAX', amount: 800, entryPrice: 42, currentPrice: 36.8 },
];

function calculateHoldingMetrics(holding: typeof mockHoldings[0]): Holding {
  const value = holding.amount * holding.currentPrice;
  const costBasis = holding.amount * holding.entryPrice;
  const pnl = value - costBasis;
  const pnlPercent = ((holding.currentPrice - holding.entryPrice) / holding.entryPrice) * 100;

  return {
    token: holding.token,
    amount: holding.amount,
    value,
    pnl,
    pnlPercent,
    entryPrice: holding.entryPrice,
    currentPrice: holding.currentPrice,
  };
}

export async function getPortfolioData(timeRange: string = '24h'): Promise<PortfolioStats> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 150));

  // Add price fluctuations based on time range
  const fluctuationMultiplier = timeRange === '24h' ? 0.02 : timeRange === '7d' ? 0.05 : timeRange === '30d' ? 0.1 : 0.15;
  
  const holdings = mockHoldings.map(h => {
    const priceFluctuation = (Math.random() - 0.5) * fluctuationMultiplier;
    return {
      ...h,
      currentPrice: h.currentPrice * (1 + priceFluctuation),
    };
  }).map(calculateHoldingMetrics);

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalCostBasis = holdings.reduce((sum, h) => sum + (h.amount * h.entryPrice), 0);
  const totalPnL = totalValue - totalCostBasis;
  const totalPnLPercent = (totalPnL / totalCostBasis) * 100;

  // Find best and worst performers
  const sortedByPnL = [...holdings].sort((a, b) => b.pnlPercent - a.pnlPercent);
  const bestPerformer = sortedByPnL[0].token + ' (+' + sortedByPnL[0].pnlPercent.toFixed(2) + '%)';
  const worstPerformer = sortedByPnL[sortedByPnL.length - 1].token + ' (' + sortedByPnL[sortedByPnL.length - 1].pnlPercent.toFixed(2) + '%)';

  return {
    totalValue,
    totalPnL,
    totalPnLPercent,
    bestPerformer,
    worstPerformer,
    holdings,
  };
}

export async function getPortfolioHistory(timeRange: string = '7d') {
  // Simulate historical data points
  const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const history = [];
  
  for (let i = 0; i < points; i++) {
    const baseValue = 125000;
    const trend = i * 500; // Upward trend
    const variance = (Math.random() - 0.5) * 5000;
    history.push({
      timestamp: Date.now() - (points - i) * 3600000,
      value: baseValue + trend + variance,
    });
  }
  
  return history;
}

export async function getAssetAllocation() {
  const portfolio = await getPortfolioData();
  return portfolio.holdings.map(h => ({
    token: h.token,
    value: h.value,
    percentage: (h.value / portfolio.totalValue) * 100,
  }));
}
