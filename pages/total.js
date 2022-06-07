import { useEffect, useState, useCallback } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Total() {
  const { pedido, nombre, setNombre, handleSubmitColocarOrden, total} = useQuiosco();
  

  // Se ejecuta unicamente cuando el pedido cambie
  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === '' || nombre.length < 3;
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido();

    

  }, [pedido, comprobarPedido]);

  

  return (
    <Layout pagina={"Resumen"}>
      <h1 className="text-4xl font-black">Datos y Total</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>
      <form onSubmit={handleSubmitColocarOrden}>
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre:{" "}
          </label>
          <input
            placeholder="Ej. Danny"
            type="text"
            id="nombre"
            value={nombre}
            onChange={e => setNombre( e.target.value )}
            className="bg-gray-200 mt-3 w-full lg:w-1/3 p-2 rounded"
          />
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total a pagar:{" "}
            <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>
        <div className="mt-5">
          <input
            type="submit"
            value="Confirmar pedido"
            className={`${
              comprobarPedido()
                ? "bg-gray-300"
                : "bg-indigo-600 hover:bg-indigo-800 cursor-pointer"
            }  w-full text-center lg:w-auto px-5 py-2 rounded uppercase font-bold text-white`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  );
}
