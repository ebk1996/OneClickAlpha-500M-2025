'use client';
import { useState } from 'react';

type TradingMode = 'spot' | 'margin' | 'futures';
type OrderSide = 'buy' | 'sell';

export function TradingInterface() {
  const [mode, setMode] = useState<TradingMode>('spot');
  const [side, setSide] = useState<OrderSide>('buy');
  const [amount, setAmount] = useState('');
  const [leverage, setLeverage] = useState(1);

  const AVAILABLE_BALANCE = 10; // ETH - Available balance for trading

  const calculateTotal = () => {
    const amt = parseFloat(amount) || 0;
    const price = 2280; // Example ETH price
    return (amt * price).toFixed(2);
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">⚡ Professional Trading Interface</h3>

      {/* Trading Mode Selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(['spot', 'margin', 'futures'] as TradingMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              mode === m
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/50'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Trading
          </button>
        ))}
      </div>

      {/* Buy/Sell Selector */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => setSide('buy')}
          className={`px-6 py-4 rounded-lg font-bold text-lg transition-all ${
            side === 'buy'
              ? 'bg-green-600 text-white shadow-lg shadow-green-600/50'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`px-6 py-4 rounded-lg font-bold text-lg transition-all ${
            side === 'sell'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/50'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          SELL
        </button>
      </div>

      {/* Leverage Slider (for margin/futures) */}
      {(mode === 'margin' || mode === 'futures') && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Leverage</label>
            <span className="text-xl font-bold text-yellow-400">{leverage}x</span>
          </div>
          <input
            type="range"
            min="1"
            max={mode === 'futures' ? '100' : '10'}
            value={leverage}
            onChange={(e) => setLeverage(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, rgb(234, 179, 8) 0%, rgb(234, 179, 8) ${((leverage - 1) / (mode === 'futures' ? 99 : 9)) * 100}%, rgb(55, 65, 81) ${((leverage - 1) / (mode === 'futures' ? 99 : 9)) * 100}%, rgb(55, 65, 81) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1x</span>
            <span>{mode === 'futures' ? '100x' : '10x'}</span>
          </div>
          {leverage > 20 && (
            <div className="mt-2 p-2 bg-red-900/30 border border-red-700 rounded text-xs text-red-400">
              ⚠️ High leverage increases risk. Trade responsibly.
            </div>
          )}
        </div>
      )}

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Amount (ETH)</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-4 py-3 bg-gray-800 text-white text-lg rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            ≈ ${calculateTotal()} USD
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {['25%', '50%', '75%', '100%'].map((percent) => (
            <button
              key={percent}
              onClick={() => setAmount((parseFloat(percent) / 100 * AVAILABLE_BALANCE).toFixed(4))}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition-colors"
            >
              {percent}
            </button>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Order Type:</span>
          <span className="text-white font-semibold">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Side:</span>
          <span className={`font-semibold ${side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
            {side.toUpperCase()}
          </span>
        </div>
        {(mode === 'margin' || mode === 'futures') && (
          <div className="flex justify-between">
            <span className="text-gray-400">Leverage:</span>
            <span className="text-yellow-400 font-semibold">{leverage}x</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-400">Est. Fee:</span>
          <span className="text-white">$1.23 (0.05%)</span>
        </div>
        <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between">
          <span className="text-gray-400 font-semibold">Total:</span>
          <span className="text-white font-bold text-lg">${calculateTotal()}</span>
        </div>
      </div>

      {/* Execute Button */}
      <button
        disabled={!amount}
        className={`w-full px-8 py-4 text-xl font-bold rounded-xl transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
          side === 'buy'
            ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 transform hover:scale-105'
            : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transform hover:scale-105'
        }`}
      >
        {side === 'buy' ? '🚀 BUY ETH' : '📉 SELL ETH'}
      </button>

      {/* Mode-Specific Features */}
      {mode === 'futures' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700 rounded-lg">
          <h4 className="font-semibold text-yellow-400 mb-2">⚡ Futures Features</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Up to 100x leverage</li>
            <li>• Perpetual contracts available</li>
            <li>• Auto-deleveraging protection</li>
            <li>• Insurance fund coverage</li>
          </ul>
        </div>
      )}

      {mode === 'margin' && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg">
          <h4 className="font-semibold text-blue-400 mb-2">📊 Margin Features</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Isolated & Cross margin modes</li>
            <li>• Auto-borrow functionality</li>
            <li>• Flexible interest rates</li>
            <li>• Risk management tools</li>
          </ul>
        </div>
      )}
    </div>
  );
}
