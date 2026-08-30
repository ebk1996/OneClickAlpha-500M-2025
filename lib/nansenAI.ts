import axios from 'axios';

export async function getNansenSmartMoney() {
  const res = await axios.get('/api/nansen/smart-money');
  return res.data;
}
