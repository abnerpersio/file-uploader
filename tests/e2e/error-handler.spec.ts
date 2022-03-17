import { Request, Response } from 'express';
import request from 'supertest';

import { RequestError } from '@shared/errors/request-error';
import { ErrorHandler } from '@shared/middlewares/error-handler';

import server from '../../src/server';

describe(ErrorHandler.name, () => {
  it.each([
    { code: 403, message: 'Testing message', expectedStatus: 403 },
    { code: undefined, message: 'Testing message', expectedStatus: 500 },
    { code: 500, message: 'Testing message', expectedStatus: 500 },
    { code: 422, message: 'Testing message', expectedStatus: 422 },
  ])(
    'should handle throwned request errors at request',
    async ({ code, message, expectedStatus }) => {
      const route = `/internal/testing/error/${code}`;

      server.get(route, async () => {
        throw new RequestError(message, code);
      });

      server.use(ErrorHandler);

      const response = await request(server).get(route);

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toStrictEqual({
        success: false,
        message: message,
      });
    },
  );

  it('should handle throwned default errors at request', async () => {
    const route = `/internal/testing/error/default`;

    server.get(route, async () => {
      throw new Error('Testing throwing default errors');
    });

    server.use(ErrorHandler);

    const response = await request(server).get(route);

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      success: false,
      message: 'Testing throwing default errors',
    });
  });
});
