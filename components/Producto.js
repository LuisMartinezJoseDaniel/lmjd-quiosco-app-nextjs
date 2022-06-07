import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({ producto }) => {
  const { nombre, precio, imagen } = producto;

  const { handleClickProducto, handleChangeModal } = useQuiosco();

  return (
    <div className="p-3 bg-white shadow-md rounded-xl">
      <div className="grid place-items-center">

        <Image
          width={400}
          height={500}
          src={`/assets/img/${imagen}.jpg`}
          alt={`Imagen del producto: ${nombre}`}
          className="rounded-md"
        />
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 text-white uppercase font-bold w-full p-3 mt-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150 hover:bg-indigo-800"
          onClick={() => {
            handleClickProducto(producto);
            handleChangeModal();
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
