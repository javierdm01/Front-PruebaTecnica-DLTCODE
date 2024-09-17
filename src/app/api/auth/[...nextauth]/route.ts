import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

// Definir el esquema de validación con Zod
const credentialsSchema = z.object({
  correo: z.string().email({ message: "El formato del correo no es válido." }),
  contrasena: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        correo: { label: "Username", type: "email", placeholder: "bookedwork@bookedwork.com" },
        contrasena: { label: "Password", type: "password", placeholder: '********' }
      },
      async authorize(credentials, req) {
        const res = credentialsSchema.safeParse(credentials);
          if (!res.success) {
            throw new Error(res.error?.errors.map(e => e.message).join('. '));
          
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(res.data),
            headers: { 'Content-Type': 'application/json' },
          });

          const obj = await response.json();
          if (!response.ok) {
            if (obj && obj.message) {
              throw new Error(obj.message);
            } else {
              throw new Error('Error de servidor durante el inicio de sesión.');
            }
          }
          if (obj.status==404) throw new Error(obj.response)
          return {
            id: obj.id,
            correo: obj.correo,
            rol: obj.rol,
            access_token: obj.access_token,
          };

          
        } catch (error) {
            throw error
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Callback para manejar el token JWT
    async jwt({ token, user }) {
      if (user) {
        token.correo = user.correo;
        token.rol = user.rol;
        token.access_token = user.access_token;
        token.exp = Math.floor(Date.now() / 1000) + (5 * 60); // 5 minutos de expiración
      }
      return token;
    },
    // Callback para manejar la sesión del usuario
    async session({ session, token }) {
      if (token) {
        session.user = {
          correo: token.correo as string,
          rol: token.rol as string,
          access_token: token.access_token as string,
        };
      }
      return session;
    },
    // Manejo adicional en signIn si es necesario
    async signIn({ user, account }) {
      // Aquí puedes agregar más lógica si es necesario
      return true;
    }
  },
  pages:{
    signIn:'/'
  }
} as NextAuthOptions);

export { handler as GET, handler as POST }
