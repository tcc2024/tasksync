import { useState, useEffect } from "react";
import styles from "./ModalCalendarioEventos.module.css";
import Modal from "react-modal";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import Multiselect from "multiselect-react-dropdown";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalCadastroEvento({
  modalCadastroAberto,
  setModalCadastroAberto,
  refresh,
  dataHora
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

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  async function Cadastrar() {
    try {
      const usuariosAtribuidos = usuarioAtribuido.map((usuario) => usuario.id);
      const body = {
        nome,
        descricao,
        dataHora,
        projetoID: idProjetoSelecionado,
        usuariosAtribuidos,
      };
      await ApiService.post("/Eventos/CriarEvento", body);

      setModalCadastroAberto(false);
      ToastService.Success("Evento Criado com Sucesso");
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Criar Evento");
    }
  }

  async function BuscarProjetos() {
    try {
      const response = await ApiService.get("/Projeto/listarProjeto");
      setProjetos(response.data);
    } catch (error) {
      ToastService.Error("Erro ao Listar Seus Projetos");
    }
  }

  async function BuscarUsuarios() {
    try {
      const response = await ApiService.get("/Usuario/listarUsuarios");
      setUsuarios(response.data);
    } catch (error) {
      ToastService.Error("Erro ao Listar Usuarios");
    }
  }

  useEffect(() => {
    BuscarProjetos();
    BuscarUsuarios();
  }, []);

  function FecharModal() {
    setModalCadastroAberto(false);
  }

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuarioAtribuido([...usuarioAtribuido, selectedItem]);
  }

  function selectAlterado(event) {
    setIdProjetoSelecionado(event.target.value);
  }

  function quandoRemoverUsuario(selectedList, removedItem) {
    setUsuarioAtribuido(
      usuarioAtribuido.filter((user) => user.id !== removedItem.id)
    );
  }

  return (
    <Modal
      isOpen={modalCadastroAberto}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={FecharModal}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Criar Evento</h2>
        </div>
        <button onClick={FecharModal}></button>
        <div className={styles.input}>
          <input
            className={styles.inputs}
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            className={styles.inputs}
            placeholder="Descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select
            className={styles.select}
            value={idProjetoSelecionado}
            onChange={selectAlterado}
          >
            <option value="" disabled>
              Selecione Um Projeto
            </option>
            {projetos.map((projeto) => (
              <option key={projeto.id} value={projeto.id}>
                {projeto.nome}
              </option>
            ))}
          </select>
          <Multiselect
            className={styles.multiSelect}
            options={usuarios}
            selectedValues={usuarioAtribuido}
            onSelect={quandoSelecionadoUsuario}
            onRemove={quandoRemoverUsuario}
            displayValue="nome"
          />
        </div>

        <center>
          <button className={styles.button} onClick={Cadastrar}>
            Cadastrar
          </button>
        </center>
      </div>
    </Modal>
  );
}
