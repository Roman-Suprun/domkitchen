import { IncomingHttpHeaders } from 'http';

import isEmpty from '../../lib/utils/isEmpty';
import {
  TApiHandler,
  TErrorResponse,
  TFetchOptions,
  TRequestErrorHandler,
  TRequestOptions,
  TResponseErrorAdapter,
  TResponseErrorAdapterProps,
} from './types';

const errorAdapter = <T>(error: T): T[] => {
  if (error === undefined || error === null || error === '') return [];

  if (typeof error === 'object' && error !== null) {
    const errors = Object.values(error);

    if (errors.length > 0) {
      return errors
        .reduce((acc, curr) => acc.concat(curr), [])
        .filter((err: T) => err !== null);
    }
  }

  return [error];
};

const responseAdapter = <U>(data: U): { data: U | null } | U => {
  if (data === undefined || data === null) return { data: null };

  if (typeof data === 'object' && 'data' in data) {
    return data;
  }

  return { data };
};

const responseErrorAdapter = (
  errors: TResponseErrorAdapterProps[] = [],
): TResponseErrorAdapter => {
  if (isEmpty(errors)) return ['Something went wrong'];

  if (Array.isArray(errors) && errors.length > 0) {
    return errors
      .filter(error => error !== null)
      .map(error => errorAdapter<TResponseErrorAdapterProps>(error))
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter(err => err !== null);
  }

  // TODO: condition if errors are object
  return [`Error: ${JSON.stringify(errors)}`];
};

const requestErrorHandler = (
  status: number,
  message: string,
  errors: TErrorResponse | null = null,
): TRequestErrorHandler => {
  const statusMessage =
    message === undefined || message === null
      ? 'Something went wrong'
      : message;

  if (errors && typeof errors === 'object' && 'error' in errors) {
    return {
      message: errors.error.message,
      errors: responseErrorAdapter([errors.error.details]),
    };
  }

  return {
    message: statusMessage,
    errors: responseErrorAdapter([errors]),
  };
};

const requestOptions = ({
  requestMethod,
  body = undefined,
  options,
}: TRequestOptions) => {
  const controller = new AbortController();
  const { signal } = controller;
  const method = requestMethod.toUpperCase();
  const headers = {
    'content-type': 'application/json',
    ...options.headers,
  } as IncomingHttpHeaders & Headers;

  const { cookies } = options;

  const fetchOptions: TFetchOptions = {
    method, // *GET, POST, PUT, DELETE, etc.
    headers,
    cookies: cookies || {},
    signal,
  };

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return fetchOptions;
};

export default async function apiHandler<U>(options: TApiHandler): Promise<{
  data?: U | null;
  error: TRequestErrorHandler | null;
  status: number;
}> {
  try {
    const { path } = options;
    const response = await fetch(path, requestOptions(options));
    const { status, ok, statusText } = response;
    const responseBody = await response.text();
    const transformedBody: U =
      responseBody !== '' ? JSON.parse(responseBody) : responseBody;
    const result = ok ? responseAdapter<U>(transformedBody) : null;

    const error = ok
      ? null
      : requestErrorHandler(status, statusText, {
          data: null,
          error: {
            message: responseBody,
            status,
            name: statusText,
            details: {},
          },
        });

    return {
      status,
      ...(result ?? { data: null }),
      error,
    };
  } catch (error) {
    const errorBody = requestErrorHandler(
      500,
      'External server error',
      error as TErrorResponse,
    );

    return {
      status: 500,
      data: null,
      error: errorBody,
    };
  }
}
