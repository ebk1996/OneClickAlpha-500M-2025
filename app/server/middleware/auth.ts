export function authenticateApiKey(req: any, res: any, next: any) {
  if (req.headers['x-api-key'] !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  next();
}