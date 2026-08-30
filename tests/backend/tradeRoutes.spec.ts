import express from 'express';
import request from 'supertest';
import tradeRoutes from '../../server/routes/trade';
import * as tradeEngine from '../../lib/tradeEngine';

describe('Trade Routes', () => {
  it('POST /api/trade/execute returns success payload', async () => {
    const mockExecute = jest.spyOn(tradeEngine, 'executeTrade').mockResolvedValue({ success: true, token: 'AIFLOW', usdAmount: 123, txHash: 'SIMULATED' } as any);

    const app = express();
    app.use(express.json());
    app.use('/api/trade', tradeRoutes);

    const res = await request(app).post('/api/trade/execute').send({ token: 'AIFLOW', usdAmount: 123 });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBe('AIFLOW');
    
    mockExecute.mockRestore();
  });
});
