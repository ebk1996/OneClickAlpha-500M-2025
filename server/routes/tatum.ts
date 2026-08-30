import { Router } from 'express';
import { getTatumBlockCount } from '../../lib/tatum';

const router = Router();

router.get('/blockcount', async (_req, res) => {
  if (process.env.ENABLE_TATUM !== 'true') {
    return res.status(503).json({
      error: 'Tatum integration is disabled',
      message: 'Set ENABLE_TATUM=true and configure TATUM_API_KEY',
    });
  }

  try {
    const blockCount = await getTatumBlockCount();
    res.json({ blockCount });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Failed to fetch block count from Tatum' });
  }
});

export default router;
