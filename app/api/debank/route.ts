import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const getDeBankData = unstable_cache(
  async () => {
    const res = await fetch(
      'https://api.debank.com/user/total_balance?id=top_wallet_1',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0)',
          'Accept': 'application/json',
        },
      }
    );

    if (!res.ok) throw new Error(`DeBank API error: ${res.status}`);
    return res.json();
  },
  ['debank-hidden-pnl'],
  { revalidate: 60, tags: ['debank'] }
);

export async function GET() {
  try {
    const data = await getDeBankData();
    return NextResponse.json({
      top100Buying: data?.data?.unrealized_pnl > 800,
      avgPnL7d: data?.data?.pnl_7d,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch DeBank data' },
      { status: 429 }
    );
  }
}
