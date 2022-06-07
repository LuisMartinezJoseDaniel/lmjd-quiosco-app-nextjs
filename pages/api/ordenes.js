import { PrismaClient } from "@prisma/client";

export default async function handler(request, response) {
  const prisma = new PrismaClient(); // crear la instancia para poder manipular la base
  if (request.method === "POST") {
    // Crear un registro en la tabla de ORDEN (Ver schema de PRISMA)
    // Debe coincidir exactemente tanto tipo de dato como el nombre de cada columna
    // Se debe especificar el campor data: {} explicitamente
    const orden = await prisma.orden.create({
      data: {
        nombre: request.body.nombre,
        total: request.body.total,
        pedido: request.body.pedido,
        fecha: request.body.fecha,
      },
    });
    // console.log(request.body); // obtener los datos del request
    response.json(orden);
  }
  // response.json({ metodo: "GET" });
}
