import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import Multiselect from "multiselect-react-dropdown";
import styles from "./ModalEditarProjeto.module.css";

export default function ModalEditarProjeto({
  modalAberto,
  setModalAberto,
  idProjetoSelecionado,
  refresh,
}) {
  Modal.setAppElement("#root");
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

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  useEffect(() => {
    BuscarUsuarios();
    BuscarProjetoPorID();
  }, [modalAberto]);

  async function EditarProjeto() {
    try {
      const body = {
        nome,
        descricao,
        usuariosAtribuidos
      };

      await ApiService.post("/Projeto/EditarProjeto", body);
      ToastService.Success("Projeto Editado com Sucesso");
      setModalAberto(false);
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Editar Projeto");
    }
  }

  async function BuscarProjetoPorID() {
    try {
      const response = await ApiService.get(
        "/Projeto/listarProjetoPorID?id=" + idProjetoSelecionado
      );

      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setUsuarioAtribuido(response.data.usuariosAtribuidos);
    } catch (error) {
      ToastService.Error("Erro ao Listar Projeto");
    }
  }

  async function BuscarUsuarios() {
    try {
      const response = await ApiService.get("/Usuario/listarUsuarios");
      setUsuarios(response.data);
    } catch (error) {
      ToastService.Error("Erro ao Listar Usuários");
    }
  }

  function FecharModal() {
    setModalAberto(false);
  }

  async function DeletarProjeto() {
    try {
      await ApiService.delete(
        "/Projeto/ExcluirProjeto?idE=" + idProjetoSelecionado
      );
      ToastService.Success("Projeto Deletada com Sucesso");
      FecharModal();
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Excluir Projeto");
    }
  }

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuarioAtribuido([...usuarioAtribuido, selectedItem]);
  }

  function quandoRemoverUsuario(selectedList, removedItem) {
    setUsuarioAtribuido(
      usuarioAtribuido.filter((usuario) => usuario.id !== removedItem.id)
    );
  }



  return (
    <Modal
      isOpen={modalAberto}
      style={customStyles}
      onRequestClose={FecharModal}
    >
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.titulo}>
            <h3>Editar Projeto</h3>
          </div>
          <div className={styles.inputNome}>
            <p className={styles.nomeDescProjeto}>Nome do Projeto</p>
            <input
              className={styles.input}
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className={styles.inputDesc}>
            <p className={styles.nomeDescProjeto}>Descrição do Projeto</p>
            <input
              className={styles.desc}
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className={styles.inputUsuarios}>
            <p className={styles.nomeDescTarefa}>Usuários Atribuídos</p>
            <Multiselect
              className={styles.multiSelect}
              options={usuarios}
              selectedValues={usuarioAtribuido}
              onSelect={quandoSelecionadoUsuario}
              onRemove={quandoRemoverUsuario}
              displayValue="nome" />
          </div>

          <div className={styles.botaoCadastrar}>
            <center>
              <button className={styles.button} onClick={EditarProjeto}>
                Editar Projeto
              </button>
              <button className={styles.button} onClick={DeletarProjeto}>
                Deletar Projeto
              </button>
            </center>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.textoRight}>
            <p className={styles.tituloRight}>
              Crie um projeto para gerenciar e organizar suas tarefas
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
