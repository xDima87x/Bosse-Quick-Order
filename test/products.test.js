import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../index.js';

// Testet, ob /products eine Produktliste im JSON-Format zurückgibt

test('GET /products liefert eine Produktliste', async () => {
  const response = await request(app).get('/products');
  assert.equal(response.statusCode, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length > 0);
});
