import { PrismaClient } from "@prisma/client";
import { categorias } from "./data/categorias";
import { productos } from "./data/productos";


const prisma = new PrismaClient()

const main = async () : Promise<void> => {
  try {
    // mapear el modelo Categoria con la instancia de prisma (siempre en minusculas)
    // .create ({ data : {un solo registro} })
    // .createMany ( {data:[ Muchos registros ] })
    await prisma.categoria.createMany( {
      data: categorias // data: [ categorias ]
    });
    await prisma.producto.createMany( {
      data: productos // data: [ productos ]
    } );
    
  } catch (error) {
    console.log(error)
  }
}

main()