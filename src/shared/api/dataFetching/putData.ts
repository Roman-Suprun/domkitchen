// import { TRequestHandlerOptions } from '@/interfaces/shared';
// import { TPutDataBody } from '@/interfaces/utils/dataFetching/putData';
// import apiHandler from '@/utils/dataFetching/api';
// import getUrl from '@/utils/dataFetching/getUrl';
//
// export default function putData<T>(
//   path: string,
//   body: TPutDataBody,
//   options?: TRequestHandlerOptions,
//   backendType: string = ''
// ) {
//   return apiHandler<T>({
//     path: getUrl(path, backendType),
//     requestMethod: 'PUT',
//     body,
//     options: {
//       cache: 'no-cache',
//       ...(options ?? {}),
//     },
//   });
// }
