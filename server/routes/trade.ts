import { Router } from 'express';
import { executeTrade } from '../../lib/tradeEngine';

const router = Router();

router.post('/execute', async (req, res) => {
  try {
    const result = await executeTrade(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Trade execution failed' });
  }
});

export default router;
