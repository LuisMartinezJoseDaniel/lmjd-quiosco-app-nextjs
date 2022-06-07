import Image from "next/image";

import { useEffect, useState } from "react";
import { formatearDinero } from "../helpers";
import useCounter from "../hooks/useCounter";
import useQuiosco from "../hooks/useQuiosco";
import Cerrar from "./Cerrar";

const ModalProducto = () => {
  const { producto, pedido, handleAgregarPedido } = useQuiosco();
  const cantidadMaxima = 10;
  const {
    increment,
    state: cantidad,
    setState: setCantidad,
    decrement,
  } = useCounter(); //Hook personalizado

  const [edicion, setEdicion] = useState(false); //Mostrar texto de agregar o actualizar de manera condicional

  useEffect(() => {
    //comprobar si el producto del modal existe en el pedido
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find((p) => p.id === producto.id); //Buscar el producto en el pedido

      setEdicion(true); //Mostrar texto de actualizar o agregar al pedido
      setCantidad(productoEdicion.cantidad); // Al abrir el modal, la cantidad del producto se establece en el input
    }
  }, [producto, pedido, setCantidad]);

  return (
    <div className="md:flex gap-10 relative">
      <div className="grid place-items-center md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto?.nombre}`}
          src={`/assets/img/${producto?.imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <Cerrar />
        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <div className="grid place-items-center md:place-items-start">
          <p className="mt-5 font-black text-5xl text-amber-500">
            {formatearDinero(producto.precio)}
          </p>
          <div className="flex gap-4 mt-5 border p-3">
            <button
              type="button"
              onClick={() => {
                if (cantidad <= 1) return;
                decrement();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <p className="text-3xl">
              <input
                min="1"
                max={cantidadMaxima}
                className="text-center border-b-2 border-yellow-400"
                type="number"
                value={cantidad}
                onChange={(e) => {
                  if (e.target.value > cantidadMaxima || e.target.value <= 0)
                    return;

                  setCantidad(Number(e.target.value));
                }}
              />
            </p>
            <button
              type="button"
              onClick={() => {
                increment(1, cantidadMaxima);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
          }}
          type="button"
          className="bg-indigo-600 block w-full hover:bg-indigo-700 px-5 py-2 mt-5 text-white font-bold rounded"
        >
          {edicion ? "Actualizar Producto" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
