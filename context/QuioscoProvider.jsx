import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; 

import Alerta from "../components/Alerta";


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  // Mostrar productos
  const [categorias, setCategorias] = useState([]);
  // CLick sobre una categoria
  const [categoriaActual, setCategoriaActual] = useState({});

  const [producto, setProducto] = useState({});
  // Mostrar modal
  const [modal, setModal] = useState(false);
  // Agregar al pedido
  const [pedido, setPedido] = useState([]);
  // Nombre del cliente
  const [nombre, setNombre] = useState("");
  // Obtener el router
  const router = useRouter();

  // Obtener total del pedido
  const [total, setTotal] = useState(0);

  const obtenerCategorias = async () => {
    try {
      //La url pertenece a este dominio por eso se omite el localhost:3000
      const url = `/api/categorias`;
      const { data } = await axios(url);

      setCategorias(data);
    } catch (error) {}
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  //Resaltar la primera categoria en el sidebar cuando haya elementos dentro de categorias
  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  // Calcular total cada que cambie el array de pedido
  useEffect(() => {
    const calcularTotal = () => {
      const nuevoTotal = pedido.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );

      return !pedido.length > 0 ? 0 : nuevoTotal;
    };

    setTotal(calcularTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    //encontrar la categoria que el usuario ha clickeado
    const [categoria] = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria);
    router.push("/");
  };

  const handleClickProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  //Eliminar cagoriaId, imagen utilizando desestructuring
  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      const pedidoActualizado = pedido.map((productoState) => {
        return productoState.id === producto.id ? producto : productoState;
      });
      setPedido(pedidoActualizado);

      //Mostrar notificacion, (PARA ELLO -> SE DEBE AGREGAR <ToastContainer /> EN EL LAYOUT)
      toast.success("La cantidad se ha actualizado!");
    } else {
      setPedido([...pedido, producto]);

      //Mostrar notificacion, (PARA ELLO -> SE DEBE AGREGAR <ToastContainer /> EN EL LAYOUT)
      toast.success("Agregado al pedido");
    }
    setModal(false);
  };

  // Editar desde la vista de resumen

  const handleEditarResumen = (id) => {
    const [productoEditar] = pedido.filter((producto) => producto.id === id);

    setProducto(productoEditar);

    handleChangeModal();
  };

  const handleEliminarProducto = (id) => {
    confirmAlert({
      customUI: ( { onClose } ) => {
        return <Alerta onClose={onClose} id={id} pedido={pedido} setPedido={ setPedido } />;
      },
    });

  };

  // COMUNICAR FRONT CON BACK -> Mandar datos al endpoint de NEXT para la Base de Datos
  const handleSubmitColocarOrden = async (e) => {
    e.preventDefault();

    try {
      // Mandar como OBJETO, el pedido (array), nombre y total
      // Debe coincidir exactamente con el SCHEMA de PRISMA TANTO CAMPOS COMO TIPO DE DATOS
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      // Resetear la APP

      setCategoriaActual(categorias[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Grandioso! 😀 el pedido se ha guardado!");

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        handleClickProducto,
        handleChangeModal,
        modal,
        producto,
        handleAgregarPedido,
        pedido,
        handleEditarResumen,
        handleEliminarProducto,
        router,
        nombre,
        setNombre,
        handleSubmitColocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
