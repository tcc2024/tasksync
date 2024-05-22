import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalCadastroProjeto.module.css";
import Multiselect from "multiselect-react-dropdown";

export default function ModalCadastroEvento({
  modalAberto,
  setModalAberto,
  eventos,
  buscarEventos,
}) {
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
  Modal.setAppElement("#root");

  const [usuario, setUsuario] = useState([])
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");

  async function Cadastrar() {
    try {
      const body = {
        nome,
        descricao,
        dataEntrega,
        usuario: {
          id: usuario,
        }
      };

      await ApiService.post("/Evento/CriarEvento", body);

      setModalAberto(false);
      ToastService.Success("Evento Criado com Sucesso");
      await buscarEventos();
    } catch (error) {
      ToastService.Error("Erro ao Criar Evento");
    }
  }

  useEffect(() => {
    buscarEventos();
  }, []);

  function FecharModal() {
    setModalAberto(false);
  }

  function selectAlteradoUsuario(event) {
    setUsuario(event.target.value);
  }

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuarioAtribuido([...usuarioAtribuido, selectedItem]);
  }

  function quandoRemoverDependencia(selectedList, removedItem) {
    setUsuarioAtribuido(
      usuarioAtribuido.filter((user) => user.id !== removedItem.id)
    );
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
      <h2 className={styles.title}>Criar Evento</h2>
      <button onClick={FecharModal}>Fechar</button>
      <input
        className={styles.nomeDescProjeto}
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        className={styles.nomeDescProjeto}
        placeholder="Descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <input
        placeholder="Data de Entrega"
        value={dataEntrega}
        type="date"
        onChange={(e) => setDataEntrega(e.target.value)}
      />
      <Multiselect
                options={eventos}
                onSelect={quandoSelecionadoUsuario}
                onRemove={quandoRemoverDependencia}
                displayValue="nome"
            />

      <button className={styles.button} onClick={Cadastrar}>Cadastrar</button>
    </Modal>
  );
}
