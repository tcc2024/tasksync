import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalEditarUsuario.module.css";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalEditarUsuario({
  modalAberto,
  setModalAberto,
  refresh,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      border: "none",
    },
  };
  Modal.setAppElement("#root");

  const [usuario, setUsuario] = useState()
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  async function Editar() {
    try {
      const body = {
        id,
        nome
      };

      await ApiService.put("/Usuario/EditarNomeUsuario", body);

      setModalAberto(false);
      ToastService.Success("Nome Editado com Sucesso");
      FecharModal();
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Editar Nome");
    }
  }

  async function BuscarUsuario() {
    try {
      const response = await ApiService.get("/Usuario/getuserdata");
      setUsuario(response.data.nome);
      setEmail(response.data.email);
      setId(response.data.id);
    } catch (error) {
      ToastService.Error("Erro ao Listar Usuarios");
    }
  }

  useEffect(() => {
    BuscarUsuario();
  }, []);


  function FecharModal() {
    setModalAberto(false);
  }


  return (
    <Modal
      isOpen={modalAberto}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={FecharModal}
    >
      <div className={styles.container}>
      <p>{email}</p>
      <input
        className={styles.inputs}
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button className={styles.button} onClick={Editar}>Editar</button>
      </div>
    </Modal>
  );
}
