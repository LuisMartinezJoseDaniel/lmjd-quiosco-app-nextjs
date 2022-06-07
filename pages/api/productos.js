import { PrismaClient } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//Consultar la base de datos por medio de la API de NextJS

//Siguiendo la estructura de pages:
//localhost:3000/api/productos

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const productos = await prisma.producto.findMany();
  res.status(200).json(productos);
}
