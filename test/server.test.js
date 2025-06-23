import { test } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../index.js';


test('GET /products returns JSON array', async () => {
  const res = await request(app).get('/products');
  assert.equal(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});

test('POST /order echoes ok', async () => {
  const res = await request(app)
    .post('/order')
    .send({ customer: '123', items: [{ mat: '2001', qty: 1 }] });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('GET / serves index.html', async () => {
  const res = await request(app).get('/');
  assert.equal(res.statusCode, 200);
  assert.match(res.text, /<!DOCTYPE html>/);
});

test('GET unknown route returns 404', async () => {
  const res = await request(app).get('/does-not-exist');
  assert.equal(res.statusCode, 404);
});

