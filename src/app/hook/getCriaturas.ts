
export const getCriaturas = async (correo:string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/criaturas/buscarCriaturas`,
            {
                method: 'POST',
                body: JSON.stringify({correo}),
                headers: { 'Content-Type': 'application/json' },
            });
        if (!response.ok) {
            throw new Error('Error al obtener criaturas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error al obtener criaturas');
    }
}