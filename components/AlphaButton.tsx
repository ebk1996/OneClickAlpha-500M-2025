'use client';
import { executeAlphaTrade } from '@/lib/tradeEngine';

interface Props { strategy: string; sizeUsd: number; maxSlippage: number; }

export function AlphaButton({ strategy, sizeUsd, maxSlippage }: Props) {
  const handleClick = async () => {
    const result = await executeAlphaTrade({ strategy, usdAmount: sizeUsd, slippage: maxSlippage });
    if (result.success) alert(`Executed: ${result.token} | Tx: ${result.txHash}`);
  };

  return (
    <button onClick={handleClick} className="px-12 py-8 text-3xl font-bold rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 transform hover:scale-105 transition-all shadow-2xl">
     🚀 OneClick = $500,000,000.000 🚀
    </button>
  );
}