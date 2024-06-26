import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import ToastService from "../../../services/ToastService";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";
import styles from "./ModalCadastroTarefa.module.css";
import Anexos from "../../Anexos/Anexos";

export default function ModalCadastroTarefa({
  modalAberto,
  setModalAberto,
  refresh,
  projetoClicado,
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
  const [usuariosAtribuido, setUsuariosAtribuido] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [selectProjetoDisabled, setSelectProjetoDisabled] = useState(false);
  const [anexos, setAnexos] = useState([]);

  async function adicionarAnexo(file, base64) {
    if (anexos.length === 4) {
      ToastService.Error("Limite de 4 anexos atingido!");
      return;
    }

    const novoAnexo = {
      id: 0,
      nome: file.name.replace(/\.[^.]+$/, ""),
      extensao: file.name.split(".").pop(),
      base64,
      key: anexos.length,
    };

    setAnexos([...anexos, novoAnexo]);
  }

  async function excluirAnexo(key) {
    const anexo = anexos.find((anexo) => anexo.key !== key);

    if (anexo?.id !== 0) {
      console.log("remover do backend");
    }

    let novosAnexos = anexos.filter((anexo) => anexo.key !== key);
    novosAnexos = novosAnexos.map((anexo, index) => {
      anexo.key = index;
      return anexo;
    });

    setAnexos(novosAnexos);
  }

  async function Cadastrar() {
    try {
      const body = {
        nome,
        descricao,
        dataEntrega,
        projeto_id: idProjetoSelecionado,
        usuariosAtribuidos: usuariosAtribuido.map((usuario) => usuario.id),
        anexos,
      };

      await ApiService.post("/Tarefa/CriarTarefa", body);
      setModalAberto(false);
      ToastService.Success("Tarefa Criada com Sucesso");
      refresh();
    } catch (error) {
      ToastService.Error("Erro ao Criar Tarefa");
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
      ToastService.Error("Erro ao Listar Usuários");
    }
  }

  useEffect(() => {
    BuscarProjetos();
    BuscarUsuarios();
  }, []);

  useEffect(() => {
    if (projetoClicado) {
      setSelectProjetoDisabled(true);
      setIdProjetoSelecionado(projetoClicado);
      return;
    }
    setSelectProjetoDisabled(false);
  }, [projetoClicado]);

  function FecharModal() {
    setModalAberto(false);
  }

  function selectAlterado(event) {
    setIdProjetoSelecionado(event.target.value);
  }

  function quandoSelecionadoUsuario(selectedList, selectedItem) {
    setUsuariosAtribuido([...usuariosAtribuido, selectedItem]);
  }

  function quandoRemoverUsuario(selectedList, removedItem) {
    setUsuariosAtribuido(
      usuariosAtribuido.filter((usuario) => usuario.id !== removedItem.id)
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
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.title}>
            <h3>Criar Tarefa</h3>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <p className={styles.inputLabel}>Nome da Tarefa</p>
              <input
                className={styles.input}
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <p className={styles.inputLabel}>Descrição da Tarefa</p>
              <input
                className={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <p className={styles.inputLabel}>Data de Entrega</p>
            <input
              className={`${styles.input} ${styles.inputDate}`}
              placeholder="Data de Entrega"
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <p className={styles.inputLabel}>Projeto</p>
            <select
              className={`${styles.input} ${styles.selectInput}`}
              value={idProjetoSelecionado}
              onChange={selectAlterado}
              disabled={selectProjetoDisabled}
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

          <div className={styles.anexosContainer}>
            <Anexos
              anexos={anexos}
              adicionarAnexo={adicionarAnexo}
              excluirAnexo={excluirAnexo}
            />
          </div>

          <div className={styles.buttonContainer}>
            <center>
              <button className={styles.button} onClick={Cadastrar}>
                Cadastrar
              </button>
            </center>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.rightText}>
            <p className={styles.rightTitle}>
              Crie uma tarefa para gerenciar e organizar suas atividades
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
