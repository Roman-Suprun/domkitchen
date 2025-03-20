import { TRegistrationFormData } from 'shared/ts/common';

import apiHandler from './apiHandler';
import { TRequestHandlerOptions } from './types';

export type TPostDataBody = TRegistrationFormData;

export default function postData<T>(
  path: string,
  body: TPostDataBody,
  options?: TRequestHandlerOptions,
) {
  return apiHandler<T>({
    path,
    requestMethod: 'POST',
    body,
    options: {
      cache: 'no-cache',
      ...(options ?? {}),
    },
  });
}
