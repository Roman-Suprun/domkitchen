import { IncomingHttpHeaders } from 'http';

import { TRegistrationFormData } from 'shared/ts/common';

export type TRequestHandlerOptions = Record<string, unknown>;

export type TError = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

export type TErrorResponse = {
  data: null;
  error: TError;
};

export type TResponseErrorAdapterProps =
  | TErrorResponse
  | null
  | Record<string, unknown>;

export type TResponseErrorAdapter =
  | string[]
  | (TErrorResponse | null | Record<string, unknown>)[];

export type TRequestErrorHandler = {
  message: string;
  errors: TResponseErrorAdapter;
};

export type TApiOptions = {
  headers?: IncomingHttpHeaders;
  cookies?: Record<string, string>;
  cache?: string;
  searchQuery?: string | string[];
};

export type TRequestOptions = {
  requestMethod: string;
  options: TApiOptions;
  // body?: TPutDataBody | TPostDataBody;
  body?: TPostDataBody;
  path: string;
};

export type TFetchOptions = {
  method: string;
  headers: IncomingHttpHeaders & Headers;
  cookies: Record<string, string>;
  body?: string;
} & RequestInit;

export type TPostDataBody = TRegistrationFormData;

export type TApiHandler = {
  path: string;
  requestMethod: string;
  // body?: TPutDataBody | TPostDataBody;
  body?: TPostDataBody;
  options: TApiOptions;
};
