import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    } & DefaultSession['user'];
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
}
