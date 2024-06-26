import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import styles from "./ModalCadastroProjeto.module.css";
import Multiselect from "multiselect-react-dropdown";

export default function ModalCadastroProjeto({
  modalAberto,
  setModalAberto,
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

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosAtribuido, setUsuariosAtribuido] = useState([]);

  async function CadastrarProjeto() {
    try {
      const body = {
        nome,
        descricao,
        usuariosAtribuidos: usuariosAtribuido.map((usuario) => usuario.id),
      };

      await ApiService.post("/Projeto/CriarProjeto", body);
      ToastService.Success("Projeto Criado com Sucesso");
      setModalAberto(false);
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Criar Projeto");
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

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuariosAtribuido([...usuariosAtribuido, selectedItem]);
  }

  function quandoRemoverUsuario(selectedList, removedItem) {
    setUsuariosAtribuido(
      usuariosAtribuido.filter((usuario) => usuario.id !== removedItem.id)
    );
  }

  useEffect(() => {
    BuscarUsuarios();
  }, []);

  function FecharModal() {
    setModalAberto(false);
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
            <h3>Vamos Criar um Projeto</h3>
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

          <div className={styles.inputGroup}>
            <p className={styles.inputLabel}>Usuários Atribuídos</p>
            <Multiselect
              options={usuarios}
              placeholder="Selecione ao menos um usuário para a tarefa"
              selectedValues={usuariosAtribuido}
              onSelect={quandoSelecionadoUsuario}
              onRemove={quandoRemoverUsuario}
              displayValue="nome"
              className={styles.multiselect}
            />
          </div>

          <div className={styles.botaoCadastrar}>
            <center>
              <button className={styles.button} onClick={CadastrarProjeto}>
                Criar Projeto
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
