import { useRouter } from "next/router";

//Crear navegacion del pedido
const pasos = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" },
];

const Pasos = () => {
  const router = useRouter();

  //Calcular progreso dependiendo del pathname del router
  const getProgress = () => {
    //Extraer el pathname
    const { pathname } = router;
    //url = /                       url = /resumen
    return pathname === pasos[0].url ? 2 : pathname === pasos[1].url ? 48 : 100;
  };
  return (
    <>
      <div className="flex justify-between my-5 py-5">
        {pasos.map((paso) => (
          <div key={paso.paso} className="group">
            <div className="group-hover:bg-indigo-600 transition ease-in-out duration-200 delay-150 w-[10px] h-[10px] rounded-full mx-auto"></div>
            <button
              onClick={() => {
                router.push(paso.url);
              }}
              className="text-2xl font-bold"
            >
              {paso.nombre}
            </button>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 mb-10">
        {/* Barra de progreso */}
        {/* Se utiliza un style ya que debe ser dinamico */}
        <div
          className={`rounded-full bg-amber-500 text-xs leading-none
          h-2 text-center text-white w-10}`}
          style={{ width: `${getProgress()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
