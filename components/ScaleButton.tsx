'use client';
import { executeScaleTrade } from '@/lib/tradeEngine';

interface Props { amount: number; label: string; strategy: string; }

export function ScaleButton({ amount, label, strategy }: Props) {
  const handleClick = async () => {
    const result = await executeScaleTrade({ strategy, usdAmount: amount, slippage: 0.3 });
    if (result.success) alert(`${label} filled in ${result.fillTime}s`);
  };

  return (
    <button onClick={handleClick} className="px-8 py-6 text-2xl font-bold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 transform hover:scale-105 transition-all shadow-2xl">
      {label} (${(amount / 1e6).toFixed(0)}M)
    </button>
  );
}