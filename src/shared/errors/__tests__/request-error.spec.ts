import { RequestError } from '../request-error';

describe(RequestError.name, () => {
  it('should create a default request error', () => {
    const error = new RequestError('Internal error');

    expect(error.statusCode).toBe(500);

    expect(() => {
      throw error;
    }).toThrow('Internal error');
  });

  it.each([
    { statusCode: 401, message: 'Unauthorized' },
    { statusCode: 403, message: 'Forbidden' },
  ])('should create a request error with status code', ({ statusCode, message }) => {
    const error = new RequestError(message, statusCode);

    expect(error.statusCode).toBe(statusCode);

    expect(() => {
      throw error;
    }).toThrow(message);
  });
});
