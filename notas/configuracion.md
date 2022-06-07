# Typescript
Instalar typescript globalmente:
```
npm install -g typescript

```
Luego de ello linkearlo a npm:
```
npm link typescript

```
Finalmente instalar la dependencia de desarrollo:
```
npm install @types/node --save-dev
```

# Seeders

Para ejecutar los seeders es necesario instalar:

```
yarn add ts-node
```

o con npm:

```
npm i ts-node
```

Ejecutar el seeder:

Crear en el package.json:

```
"prisma":{
    "seed" : "ts-node prisma/seed.ts"
  }
```

y correrlo con:

```
npx prisma db seed
```