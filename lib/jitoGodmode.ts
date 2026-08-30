// lib/jitoGodmode.ts
import axios from 'axios';
import { Connection, VersionedTransaction } from '@solana/web3.js';

const JITO_ENDPOINTS = [
  'https://mainnet.block-engine.jito.wtf/api/v1/bundles',
  'https://amsterdam.mainnet.block-engine.jito.wtf/api/v1/bundles',
  'https://frankfurt.mainnet.block-engine.jito.wtf/api/v1/bundles',
];

const TIP_LAMPORTS_BASE = 100_000; // 0.0001 SOL base
const MAX_TIP_PER_TRADE = 5_000_000; // 0.005 SOL max (adjustable)

export async function sendJitoBundle(
  serializedTxs: string[],          // Array of base64 transactions
  tipLamports: number = TIP_LAMPORTS_BASE
): Promise<string | null> {
  const bundle = {
    jsonrpc: "2.0",
    id: 1,
    method: "sendBundle",
    params: [
      serializedTxs,
      { encoding: "base64" },
      { tipLamports }  // Dynamic tip
    ]
  };

  for (const endpoint of JITO_ENDPOINTS) {
    try {
      const resp = await axios.post(endpoint, bundle, { timeout: 5000 });
      if (resp.data?.result) {
        console.log(`Jito Bundle Sent | Tip: ${tipLamports / 1e9} SOL | ID: ${resp.data.result}`);
        return resp.data.result;
      }
    } catch (err) {
      continue; // Try next region
    }
  }
  return null;
}

// Auto-calculate tip based on trade size & mempool pressure
export function calculateDynamicTip(usdAmount: number): number {
  const base = 100_000;
  if (usdAmount > 100_000_000) return Math.min(base * 50, MAX_TIP_PER_TRADE); // 0.005 SOL
  if (usdAmount > 50_000_000) return base * 30;
  if (usdAmount > 10_000_000) return base * 15;
  return base * 5;
}