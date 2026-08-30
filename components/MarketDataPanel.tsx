'use client';
import { useEffect, useState } from 'react';
import { getMarketData } from '@/lib/marketData';

interface MarketItem {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export function MarketDataPanel() {
  const [markets, setMarkets] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketData(selectedMarket);
        setMarkets(data);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [selectedMarket]);

  const formatNumber = (num: number, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-green-400">Real-Time Market Data</h3>
        <div className="flex gap-2">
          {['all', 'defi', 'layer1', 'meme'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedMarket(filter)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedMarket === filter
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-3">Token</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3 text-right">24h Change</th>
                <th className="pb-3 text-right">Volume (24h)</th>
                <th className="pb-3 text-right">Market Cap</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market) => (
                <tr key={market.symbol} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {market.symbol.charAt(0)}
                      </div>
                      <span className="font-semibold">{market.symbol}</span>
                    </div>
                  </td>
                  <td className="text-right font-mono">{formatNumber(market.price)}</td>
                  <td className={`text-right font-bold ${market.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {market.change24h >= 0 ? '+' : ''}{market.change24h.toFixed(2)}%
                  </td>
                  <td className="text-right text-gray-300">{formatNumber(market.volume24h)}</td>
                  <td className="text-right text-gray-300">{formatNumber(market.marketCap)}</td>
                  <td className="text-right">
                    <button className="px-3 py-1 text-sm font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 grid grid-cols-4 gap-4 text-sm">
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-gray-400 mb-1">Total Market Cap</div>
          <div className="text-xl font-bold text-green-400">{formatNumber(markets.reduce((acc, m) => acc + m.marketCap, 0))}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-gray-400 mb-1">24h Volume</div>
          <div className="text-xl font-bold text-blue-400">{formatNumber(markets.reduce((acc, m) => acc + m.volume24h, 0))}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-gray-400 mb-1">Gainers</div>
          <div className="text-xl font-bold text-green-400">{markets.filter(m => m.change24h > 0).length}</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="text-gray-400 mb-1">Losers</div>
          <div className="text-xl font-bold text-red-400">{markets.filter(m => m.change24h < 0).length}</div>
        </div>
      </div>
    </div>
  );
}
