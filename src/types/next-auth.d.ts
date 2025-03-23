import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl: string | null;
    } & DefaultSession['user'];
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string | null;
  }
}
