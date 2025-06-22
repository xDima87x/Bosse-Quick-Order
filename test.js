import request from 'supertest';
import assert from 'assert';

async function loadApp() {
  process.env.NODE_ENV = 'test';
  const mod = await import('./index.js');
  return mod.default;
}

async function runTests() {
  const app = await loadApp();
  await request(app)
    .get('/products')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      assert(Array.isArray(res.body), 'products should be an array');
    });

  await request(app)
    .post('/order')
    .send({ items: [{ sku: '2001', qty: 1 }] })
    .expect(200)
    .then(res => {
      assert.strictEqual(res.body.status, 'ok');
    });

  console.log('All tests passed');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Tests failed', err);
  process.exit(1);
});
