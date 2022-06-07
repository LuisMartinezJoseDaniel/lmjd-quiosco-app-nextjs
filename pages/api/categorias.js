import { PrismaClient } from "@prisma/client";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//Consultar la base de datos por medio de la API de NextJS

//Siguiendo la estructura de pages:
//localhost:3000/api/categorias


export default async function handler(req, res) {
  const prisma = new PrismaClient();
  // '/notas/prisma.md' -> include
  const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });

  res.status(200).json(categorias);
}
