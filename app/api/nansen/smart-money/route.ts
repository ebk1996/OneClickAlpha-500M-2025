import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://api.nansen.ai/smart-money', {
      headers: { Authorization: `Bearer ${process.env.NANSEN_API_KEY}` },
    });
    const score = response.data.topWallets.length > 5 ? 96 : 0;
    return NextResponse.json({ score });
  } catch (err) {
    console.error('Nansen API error:', err);
    return NextResponse.json({ score: 0, error: 'Failed to fetch smart money data' }, { status: 500 });
  }
}
