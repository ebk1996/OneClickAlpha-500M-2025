'use client';
import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  trader: string;
  pnl: number;
  winRate: number;
  trades: number;
  volume: number;
  roi: number;
}

export function LeaderboardPanel() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, trader: 'WhaleHunter', pnl: 2847000, winRate: 99.7, trades: 189, volume: 125000000, roi: 847 },
    { rank: 2, trader: 'AlphaSniper', pnl: 1920000, winRate: 98.2, trades: 432, volume: 98000000, roi: 623 },
    { rank: 3, trader: 'MoonBoy', pnl: 1450000, winRate: 96.8, trades: 891, volume: 67000000, roi: 512 },
    { rank: 4, trader: 'DiamondHands', pnl: 980000, winRate: 94.3, trades: 234, volume: 54000000, roi: 389 },
    { rank: 5, trader: 'DeFiKing', pnl: 876000, winRate: 93.1, trades: 567, volume: 43000000, roi: 298 },
    { rank: 6, trader: 'CryptoNinja', pnl: 654000, winRate: 91.7, trades: 723, volume: 38000000, roi: 234 },
    { rank: 7, trader: 'YieldFarmer', pnl: 543000, winRate: 89.4, trades: 456, volume: 29000000, roi: 187 },
    { rank: 8, trader: 'TokenMaster', pnl: 432000, winRate: 87.2, trades: 612, volume: 24000000, roi: 156 },
    { rank: 9, trader: 'SmartMoney', pnl: 389000, winRate: 85.8, trades: 389, volume: 19000000, roi: 134 },
    { rank: 10, trader: 'ProTrader', pnl: 298000, winRate: 83.5, trades: 501, volume: 16000000, roi: 112 },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-orange-400">🏆 Top Traders Leaderboard</h3>
        <div className="flex gap-2">
          {(['24h', '7d', '30d', 'all'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3">Rank</th>
              <th className="pb-3">Trader</th>
              <th className="pb-3 text-right">P&L</th>
              <th className="pb-3 text-right">Win Rate</th>
              <th className="pb-3 text-right">Trades</th>
              <th className="pb-3 text-right">Volume</th>
              <th className="pb-3 text-right">ROI</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={entry.rank}
                className={`border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                  entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-900/10 to-orange-900/10' : ''
                }`}
              >
                <td className="py-4">
                  <div className="text-2xl">{getRankBadge(entry.rank)}</div>
                </td>
                <td className="font-semibold text-white">{entry.trader}</td>
                <td className="text-right font-bold text-green-400">{formatCurrency(entry.pnl)}</td>
                <td className="text-right">
                  <span className={`font-semibold ${entry.winRate >= 95 ? 'text-green-400' : 'text-blue-400'}`}>
                    {entry.winRate}%
                  </span>
                </td>
                <td className="text-right text-gray-300">{entry.trades}</td>
                <td className="text-right text-gray-300">{formatCurrency(entry.volume)}</td>
                <td className="text-right">
                  <span className="font-bold text-yellow-400">+{entry.roi}%</span>
                </td>
                <td className="text-right">
                  <button className="px-3 py-1 text-sm font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border border-orange-700 rounded-lg">
        <h4 className="font-semibold text-orange-400 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-gray-300">
          Click "Copy" to automatically replicate a top trader's strategy. Our AI will mirror their trades in real-time with customizable position sizes.
        </p>
      </div>
    </div>
  );
}
