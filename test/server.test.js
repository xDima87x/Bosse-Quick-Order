import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../index.js';

// Helper to start server on random port
function startServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

test('GET /products returns product list', async () => {
  const server = await startServer();
  const port = server.address().port;

  const res = await fetch(`http://localhost:${port}/products`);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(Array.isArray(data));
  server.close();
});

test('POST /order returns ok', async () => {
  const server = await startServer();
  const port = server.address().port;

  const res = await fetch(`http://localhost:${port}/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: [] })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.deepEqual(data, { status: 'ok' });
  server.close();
});
