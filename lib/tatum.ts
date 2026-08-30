import axios from 'axios';

const defaultRpcUrl = 'https://godmode-ccf74ca5.gateway.tatum.io/';

export async function getTatumBlockCount() {
  const apiKey = process.env.TATUM_API_KEY;
  const rpcUrl = process.env.TATUM_JSONRPC_URL || defaultRpcUrl;

  if (!apiKey) {
    throw new Error('TATUM_API_KEY is not configured');
  }

  try {
    const response = await axios.post(
      rpcUrl,
      {
        id: 1,
        jsonrpc: '2.0',
        method: 'getblockcount',
      },
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'x-api-key': apiKey,
        },
        timeout: 10000,
      }
    );

    if (response.data?.error) {
      throw new Error(`Tatum RPC error: ${response.data.error?.message || 'Unknown error'}`);
    }

    return response.data?.result ?? response.data;
  } catch (error: any) {
    const message = error?.response?.data?.error?.message || error?.message || 'Tatum request failed';
    throw new Error(message);
  }
}
