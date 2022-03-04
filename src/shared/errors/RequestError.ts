export class RequestError extends Error {
  constructor(message: string, readonly statusCode = 500) {
    super(message);
  }
}
