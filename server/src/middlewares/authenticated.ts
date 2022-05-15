import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function authenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secretSession) as TokenPayload;
    const { id } = decoded;

    request.user = { id: Number(id) };

    return next();
  } catch (err: any) {
    throw new AppError('Invalid JWT token', 401);
  }
}
