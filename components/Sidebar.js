import Image from "next/image";
import Link from "next/link";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categorias } = useQuiosco();
  return (
    <>
      <Link href="/">
        <a>
          <Image
            width={300}
            height={100}
            src="/assets/img/logo.svg"
            alt="Imagen logotipo"
            className="cursor-pointer"
          />
        </a>
      </Link>
      <nav className="mt-10 p-3 text-sm grid grid-cols-2 md:grid-cols-1 md:p-0 ">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
