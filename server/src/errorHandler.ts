import { ErrorRequestHandler } from 'express';
import AppError from './errors/AppError';

const errorHandler: ErrorRequestHandler = (error, request, response, _) => {
  if (error instanceof AppError)
    return response.status(error.statusCode).json({ message: error.message });

  console.error('Error', error);

  const res: any = { message: 'Internal Server Error' };

  return response.status(500).json(res);
};

export default errorHandler;
