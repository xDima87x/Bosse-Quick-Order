import request from 'supertest';
import app from '../index.js';

describe('API endpoints', () => {
  it('GET /products should return product list', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('POST /order should accept order', async () => {
    const payload = { customer: '42', items: [{ mat: '2001', qty: 2 }] };
    const res = await request(app).post('/order').send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
