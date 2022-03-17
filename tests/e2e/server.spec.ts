import request from 'supertest';

import server from '../../src/server';

it('should get that everything is ok', async () => {
  const response = await request(server).get('/internal/health');

  expect(response.status).toBe(200);
  expect(response.body.message).toBe('I"m ok!');
});

it('should get OK in OPTIONS requests', async () => {
  const response = await request(server).options('/any/route');

  expect(response.status).toBe(200);
});
