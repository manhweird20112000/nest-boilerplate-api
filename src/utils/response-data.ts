export class ResponseData<T> {
  private data: T;
  private status_code: number;
  private message: string;
  private errors: any;

  constructor(
    data: T,
    statusCode: number,
    message = '',
    errors?: Record<string, string>,
  ) {
    this.data = data;
    this.status_code = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
