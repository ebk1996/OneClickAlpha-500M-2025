import axios from 'axios';

export async function getDeBankHiddenPnL() {
  const res = await axios.get(`https://api.debank.com/user/total_balance?id=top_wallet_1`);
  return { top100Buying: res.data.unrealized_pnl > 800, avgPnL7d: res.data.pnl_7d };
}