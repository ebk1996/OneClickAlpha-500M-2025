'use client';
import { useState } from 'react';
import { executeAdvancedOrder } from '@/lib/tradeEngine';

type OrderType = 'limit' | 'stop-loss' | 'take-profit' | 'trailing-stop' | 'oco';

interface OrderConfig {
  type: OrderType;
  token: string;
  usdAmount: number;
  price?: number;
  stopPrice?: number;
  trailPercent?: number;
}

export function AdvancedOrderPanel() {
  const [orderType, setOrderType] = useState<OrderType>('limit');
  const [token, setToken] = useState('ETH');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [trailPercent, setTrailPercent] = useState('2');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!amount) return;
    
    setIsSubmitting(true);
    try {
      const config: OrderConfig = {
        type: orderType,
        token,
        usdAmount: parseFloat(amount),
        price: price ? parseFloat(price) : undefined,
        stopPrice: stopPrice ? parseFloat(stopPrice) : undefined,
        trailPercent: trailPercent ? parseFloat(trailPercent) : undefined,
      };
      
      const result = await executeAdvancedOrder(config);
      if (result.success) {
        alert(`Order placed successfully! Order ID: ${result.orderId}`);
        // Reset form
        setAmount('');
        setPrice('');
        setStopPrice('');
      } else {
        alert(`Order failed: ${result.error}`);
      }
    } catch (error) {
      alert('Error placing order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-2xl font-bold text-blue-400 mb-6">Advanced Order Types</h3>
      
      {/* Order Type Selector */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {(['limit', 'stop-loss', 'take-profit', 'trailing-stop', 'oco'] as OrderType[]).map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              orderType === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {/* Order Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Token</label>
            <select
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="SOL">SOL</option>
              <option value="AIFLOW">AIFLOW</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {(orderType === 'limit' || orderType === 'oco') && (
          <div>
            <label className="block text-sm text-gray-400 mb-2">Limit Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {(orderType === 'stop-loss' || orderType === 'take-profit' || orderType === 'oco') && (
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {orderType === 'take-profit' ? 'Take Profit Price' : 'Stop Price'}
            </label>
            <input
              type="number"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {orderType === 'trailing-stop' && (
          <div>
            <label className="block text-sm text-gray-400 mb-2">Trail Percentage (%)</label>
            <input
              type="number"
              value={trailPercent}
              onChange={(e) => setTrailPercent(e.target.value)}
              placeholder="2.0"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !amount}
          className="w-full px-8 py-4 text-xl font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Placing Order...' : `Place ${orderType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Order`}
        </button>
      </div>

      {/* Order Type Descriptions */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-400">
          {orderType === 'limit' && '📊 Limit Order: Buy/sell at a specific price or better'}
          {orderType === 'stop-loss' && '🛡️ Stop-Loss: Automatically sell when price drops to protect profits'}
          {orderType === 'take-profit' && '🎯 Take-Profit: Automatically sell when target price is reached'}
          {orderType === 'trailing-stop' && '📈 Trailing Stop: Dynamic stop-loss that follows price movements'}
          {orderType === 'oco' && '🔄 OCO (One-Cancels-Other): Two orders where execution of one cancels the other'}
        </p>
      </div>
    </div>
  );
}
