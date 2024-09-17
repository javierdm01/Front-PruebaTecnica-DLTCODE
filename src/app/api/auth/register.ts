import {  z } from "zod";
import {Persona} from '@/app/lib/definitions';

export async function registerUser({ data }: { data: Persona }) {

const schema = z.object({
  nombre: z.string(),
  correo: z.string().email(),
  rol: z.string(),
  contrasena: z.string().optional(),
});

  const parsedData = schema.safeParse(data);
    console.log(parsedData)
  if (!parsedData.success) {
    throw new Error('Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.');
  }

  if (parsedData.success) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(parsedData.data),
        headers: { 'Content-Type': 'application/json' },
      });
      const user = await response.json();
      if(user.message) return user;
      return true;
    } catch (error) {
      return 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.';
      
    }
  }
}
