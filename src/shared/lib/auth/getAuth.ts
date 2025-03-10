import { getServerSession } from 'next-auth';

import { authOptions } from './authOptions';

export async function getSession() {
  return getServerSession(authOptions);
}
