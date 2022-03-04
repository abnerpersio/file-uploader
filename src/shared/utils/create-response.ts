export class CreateResponse {
  static ok<T>(data: T) {
    return {
      status: 200,
      data,
    };
  }

  static badRequest(message: string) {
    return {
      status: 400,
      message,
    };
  }

  static serverError() {
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
}
