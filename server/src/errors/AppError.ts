class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly innerException: Error | string | null;

  constructor(
    message: string,
    statusCode = 400,
    innerException: Error | string | null = null,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.innerException = innerException;
  }
}

export default AppError;

// https://www.lucidchart.com/pages/
