'use client';
import { useEffect, useState } from 'react';
import { getPortfolioData } from '@/lib/portfolio';

interface Holding {
  token: string;
  amount: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

interface PortfolioStats {
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  bestPerformer: string;
  worstPerformer: string;
  holdings: Holding[];
}

export function PortfolioAnalytics() {
  const [portfolio, setPortfolio] = useState<PortfolioStats | null>(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPortfolioData(timeRange);
        setPortfolio(data);
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (loading || !portfolio) {
    return (
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-purple-400">Portfolio Analytics</h3>
        <div className="flex gap-2">
          {['24h', '7d', '30d', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-2">Total Value</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(portfolio.totalValue)}</div>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-2">Total P&L</div>
          <div className={`text-3xl font-bold ${portfolio.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.totalPnL >= 0 ? '+' : ''}{formatCurrency(portfolio.totalPnL)}
          </div>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-2">ROI</div>
          <div className={`text-3xl font-bold ${portfolio.totalPnLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {portfolio.totalPnLPercent >= 0 ? '+' : ''}{portfolio.totalPnLPercent.toFixed(2)}%
          </div>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="text-sm text-gray-400 mb-2">Win Rate</div>
          <div className="text-3xl font-bold text-blue-400">
            {((portfolio.holdings.filter(h => h.pnl > 0).length / portfolio.holdings.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3">Asset</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3 text-right">Value</th>
              <th className="pb-3 text-right">P&L</th>
              <th className="pb-3 text-right">P&L %</th>
              <th className="pb-3 text-right">Allocation</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.holdings.map((holding) => (
              <tr key={holding.token} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                      {holding.token.charAt(0)}
                    </div>
                    <span className="font-semibold">{holding.token}</span>
                  </div>
                </td>
                <td className="text-right font-mono text-gray-300">{holding.amount.toFixed(4)}</td>
                <td className="text-right font-mono">{formatCurrency(holding.value)}</td>
                <td className={`text-right font-bold ${holding.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {holding.pnl >= 0 ? '+' : ''}{formatCurrency(holding.pnl)}
                </td>
                <td className={`text-right font-bold ${holding.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                </td>
                <td className="text-right text-gray-300">
                  {((holding.value / portfolio.totalValue) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Insights */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-700 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">🏆 Best Performer</div>
          <div className="text-xl font-bold text-green-400">{portfolio.bestPerformer}</div>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700 rounded-lg">
          <div className="text-sm text-gray-400 mb-1">📉 Worst Performer</div>
          <div className="text-xl font-bold text-red-400">{portfolio.worstPerformer}</div>
        </div>
      </div>
    </div>
  );
}
