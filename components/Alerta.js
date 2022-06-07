import { toast } from "react-toastify";
import useQuiosco from "../hooks/useQuiosco";

const Alerta = ({ onClose, id, pedido, setPedido }) => {
  const productoEliminar = pedido.find((producto) => producto.id === id);

  return (
    <div className="bg-white p-5 shadow-md border rounded-xl">
      <h3 className="text-2xl font-bold mb-5"> ¿ Estás seguro ? </h3>
      <p className="p-5 bg-gray-100 mb-5 rounded-xl text-xl">
        El producto:{" "}
        <span className="font-bold">{productoEliminar.nombre}</span>
      </p>
      <p className="p-5 bg-gray-100 mb-5 rounded-xl text-xl">
        ¿Será eliminado del carrito?
      </p>

      <div className="flex justify-between items-center">
        <button
          className="bg-indigo-600 text-white shadow-lg px-5 py-3 uppercase font-bold text-md rounded-lg"
          onClick={onClose}
        >
          No
        </button>
        <button
          className="bg-gray-100 rounded-xl px-5 py-3 uppercase shadow-md"
          onClick={() => {
            const arrayActualizado = pedido.filter(
              (producto) => producto.id != id
            );
            setPedido(arrayActualizado);
            onClose();
            toast.error("El producto ha sido eliminado!");
            toast
          }}
        >
          Sí, borralo!
        </button>
      </div>
    </div>
  );
};

export default Alerta;
