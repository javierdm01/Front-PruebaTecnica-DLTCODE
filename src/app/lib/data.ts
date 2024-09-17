import { CrearCriatura, ModCriatura, Persona } from "./definitions";


export async function crearCriatura(crearCriatura:CrearCriatura) {
    console.log(crearCriatura)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/criaturas/crearCriaturas`, {
            method: 'POST',
            body: JSON.stringify(crearCriatura),
            headers: { 'Content-Type': 'application/json' },
          });
        const data = await response.json();
        if(data.message) throw new Error(data.message)
        return data
    } catch (error) {
        return Error('Nombre ya registrado');
        
    }
}

export async function modCriatura(criatura:ModCriatura) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/criaturas/editarCriaturas`, {
            method: 'PUT',
            body: JSON.stringify(criatura),
            headers: { 'Content-Type': 'application/json' },
          });
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        throw new Error('Error al modificar criatura');
        
    }
}

export async function getOnePersona(correo:string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/personas/getOnePersona`,{
            method: 'POST',
            body: JSON.stringify({correo}),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error('Error al obtener persona');
        
    }
}

export async function modPersona(persona:Persona) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/personas/updatePersona`, {
            method: 'PUT',
            body: JSON.stringify(persona),
            headers: { 'Content-Type': 'application/json' },
          });
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error('Error al modificar persona');
        
    }
}

export async function eliminarCriatura({correo, nombre}: {correo:string, nombre:string}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/criaturas/eliminarCriaturas`, {
            method: 'DELETE',
            body: JSON.stringify({correo, nombre}),
            headers: { 'Content-Type': 'application/json' },
          });
        const data = await response.json();
        return data
    } catch (error) {
        throw new Error('Error al eliminar criatura');
        
    }
}