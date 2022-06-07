# Consultas en prisma
## Where
```
const productos = await prisma.producto.findMany({
  where: {
    categoriaId: 1
  }
});
```
## Include
Traer de la base de datos los campos relacionados (realacion 1 a muchos)
```
const categorias = await prisma.categoria.findMany({
    include: {
      productos: true,
    },
  });
```