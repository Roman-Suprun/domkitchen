import apiHandler from './apiHandler';
import { TRequestErrorHandler, TRequestHandlerOptions } from './types';

export default function getData<T>(
  path: string,
  options?: TRequestHandlerOptions,
): Promise<{
  data?: T | null;
  error: TRequestErrorHandler | null;
  status: number;
}> {
  return apiHandler<T>({
    path,
    requestMethod: 'GET',
    options: {
      cache: 'no-cache',
      ...(options ?? {}),
    },
  });
}
