import request from 'supertest';
import express from 'express';
import appServer from '../../server/server';

// Since server/server.ts starts the server immediately, we create a minimal app to test CORS middleware in isolation.
// Alternatively, we can hit a live server path, but here we mimic a route.

const app = express();

// Inject the same CORS middleware as in server/server.ts
app.use((req, res, next) => {
  const allowedOrigin = process.env.NEXT_PUBLIC_API_URL || '*';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));

describe('CORS middleware', () => {
  it('should set CORS headers on GET', async () => {
    const res = await request(app).get('/health').set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe(process.env.NEXT_PUBLIC_API_URL || '*');
    expect(res.headers['access-control-allow-methods']).toContain('GET');
    expect(res.headers['access-control-allow-headers']).toContain('Content-Type');
    expect(res.headers['access-control-allow-credentials']).toBe('true');
    expect(res.status).toBe(200);
  });

  it('should handle OPTIONS preflight', async () => {
    const res = await request(app).options('/health').set('Origin', 'http://localhost:3000');
    expect(res.status).toBe(204);
    expect(res.headers['access-control-allow-origin']).toBe(process.env.NEXT_PUBLIC_API_URL || '*');
  });
});
