import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    correo: string;
    rol: string;
    access_token: string;
  }

  interface Session {
    user: {
      correo: string;
      rol: string;
      access_token: string;
    };
  }
}