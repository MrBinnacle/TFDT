const request = require('supertest');
const app = require('../Backend/app');

describe('GET /api/decision-tree', () => {
  it('returns decision tree root object', async () => {
    const res = await request(app).get('/api/decision-tree');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('children');
  });
});
