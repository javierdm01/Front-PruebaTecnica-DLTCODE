
export interface Persona {
    nombre: string,
    correo: string,
    contrasena: string,
    rol: string,
    descripcion?:string
}
export interface Criatura{
    nombre: string,
    tipo: string,
    nivel: number,
    entrenado:boolean,
}
export interface CrearCriatura extends Criatura{
    correo:string
}
export interface ModCriatura extends CrearCriatura{
    anteriorNombre:string
}
export interface ModPersona extends Persona{
    descripcion:string
}

export interface ModificarPersona{
    nombre: string,
    correo: string,
    descripcion:string,
    rol: string,
}