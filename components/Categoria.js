import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";


const Categoria = ({ categoria }) => {
  const { nombre, icono, id } = categoria;
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  
  return (
    <div
      onClick={() => {
        handleClickCategoria( id )
        // Rederigir en caso de estar en resumen o total
        
      }}
      className={`${
        categoriaActual?.id == id ? "bg-amber-400" : ""
      } flex items-center gap-2 md:gap-4 w-full border p-5  hover:cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-200 hover:bg-amber-400`}
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${icono}.svg`}
        alt={`Imagen de ${nombre}`}
      />
      <p className="text-sm md:text-2xl font-bold">{nombre}</p>
    </div>
  );
};

export default Categoria;
