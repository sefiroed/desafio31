import { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

interface IErrorInfo {
  error: string;
  name: string;
  message: string;
  descripcion?: string;
  stack: string;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode, name, message, error, stack, descripcion } = err;
  const errorInfo: IErrorInfo = {
    error,
    name,
    message,
    stack,
  };
  if (descripcion) {
    errorInfo.descripcion = descripcion;
  }
  logger.error(errorInfo.message);
  res.status(statusCode || 500).json(errorInfo);
};