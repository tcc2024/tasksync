import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import styles from "./ModalEditarEventos.module.css";
import Multiselect from "multiselect-react-dropdown";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalEditarEvento({
  modalEditarAberto,
  setModalEditarAberto,
  buscarEventos,
  refresh,
  idEventoSelecionado,
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

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataHora, setDataHora] = useState("");

  async function Editar() {
    try {
      const usuariosAtribuidos = usuarioAtribuido.map((usuario) => usuario.id);

      const body = {
        id: idEventoSelecionado,
        nome,
        descricao,
        dataHora,
        projetoID: idProjetoSelecionado,
        usuariosAtribuidos,
      };

      await ApiService.put("/Eventos/EditarEvento", body);

      setModalEditarAberto(false);
      ToastService.Success("Evento Editado com Sucesso");
      FecharModal();
      refresh();
      // await buscarEventos();
    } catch (error) {
      ToastService.Error("Erro ao Editar Evento");
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

  async function BuscarEventoPorID() {
    try {
      const response = await ApiService.get(
        "/Eventos/listarEventoPorID?id=" + idEventoSelecionado
      );

      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setDataHora(response.data.dataHora);
      setUsuarioAtribuido(response.data.usuariosAtribuidos);
      setIdProjetoSelecionado(response.data.idProjetoSelecionado);
    } catch (error) {
      ToastService.Error("Erro ao Listar Evento");
    }
  }

  async function DeletarEvento() {
    try {
      await ApiService.delete(
        "/Eventos/ExcluirEvento?idE=" + idEventoSelecionado
      );
      ToastService.Success("Evento Deletado com Sucesso");
      FecharModal();
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Excluir Evento");
    }
  }

  useEffect(() => {
    BuscarUsuarios();
    BuscarEventoPorID();
    BuscarProjetos();
  }, []);

  function FecharModal() {
    setModalEditarAberto(false);
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
      isOpen={modalEditarAberto}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={FecharModal}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>Editar Evento</h2>
        <p>Nome</p>
        <input
          className={styles.inputs}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <p>Descrição</p>
        <input
          className={styles.inputs}
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <p>Data do Evento</p>
        <input
        className={styles.data}
          placeholder="Data do Evento"
          type="date"
          value={dataHora}
          onChange={(e) => setDataHora(e.target.value)}
        />
        {/*
      <input
        placeholder="Data de Entrega"
        value={dataEntrega}
        type="date"
        onChange={(e) => setDataEntrega(dataHora)}
  />

        <select value={idProjetoSelecionado} onChange={selectAlterado}>
          <option value="" disabled>
            Selecione Um Projeto
          </option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>*/}

        <p>Usuarios Atribuidos</p>
        <Multiselect
          className={styles.multiSelect}
          options={usuarios}
          selectedValues={usuarioAtribuido}
          onSelect={quandoSelecionadoUsuario}
          onRemove={quandoRemoverUsuario}
          displayValue="nome"
        />

        <button className={styles.button} onClick={Editar}>
          Editar
        </button>
        <button className={styles.button} onClick={DeletarEvento}>
          Deletar
        </button>
      </div>
    </Modal>
  );
}
