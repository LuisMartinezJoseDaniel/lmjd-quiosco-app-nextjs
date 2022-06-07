import Head from "next/head";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";

import ModalProducto from "../components/ModalProducto";
import Sidebar from "../components/Sidebar";
import Pasos from "../components/Pasos";


import useQuiosco from "../hooks/useQuiosco";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//Setear el elemento principal del index, en VITE seria <div id= 'root'
//ver codigo fuente
Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  const { modal, handleChangeModal } = useQuiosco();

  return (
    <>
      <Head>
        <title>Cafe - {pagina}</title>
        <meta name="description" content="Quisco Cafeteria" />
      </Head>
      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>
        <main className="bg-[#E8F1F3] md:w-8/12 xl:w-3/4 2xl:w-4/5 md:h-screen md:overflow-y-scroll p-5">
          <Pasos />
          {children}
        </main>
      </div>
      {/* Nota. No usar React modal de manera condicional-> {modal && <Modal></Modal> } */}
      {/* Ya que esto genera un warning */}
      <Modal
        isOpen={modal}
        style={customStyles}
        closeTimeoutMS={300}
        onRequestClose={handleChangeModal}
      >
        <ModalProducto />
      </Modal>
      {/* Registrar en layout para poder mostrarlo en cualquier componente */}
      <ToastContainer />
    </>
  );
}
