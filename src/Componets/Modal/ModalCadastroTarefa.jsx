import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";
import styles from "./ModalCadastroTarefa.module.css";

export default function ModalCadastroTarefa({
  modalAberto,
  setModalAberto,
  refresh,
  projetoClicado
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

  async function Cadastrar() {
    try {
      const body = {
        nome,
        descricao,
        dataEntrega,
        projeto_id: idProjetoSelecionado,
        usuariosAtribuidos: usuariosAtribuido.map((usuario) => usuario.id),
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
    if(projetoClicado){
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
          <div className={styles.titulo}>
            <h3>Criar Tarefa</h3>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputNome}>
              <p className={styles.nomeDescTarefa}>Nome da Tarefa</p>
              <input
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.inputDesc}>
              <p className={styles.nomeDescTarefa}>Descrição da Tarefa</p>
              <input
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.inputData}>
            <p className={styles.nomeDescTarefa}>Data de Entrega</p>
            <input
              placeholder="Data de Entrega"
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </div>

          <div className={styles.inputProjeto}>
            <p className={styles.nomeDescTarefa}>Projeto</p>
            <select value={idProjetoSelecionado} onChange={selectAlterado} disabled={selectProjetoDisabled}>
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

          <div className={styles.inputUsuarios}>
            <p className={styles.nomeDescTarefa}>Usuários Atribuídos</p>
            <Multiselect
              options={usuarios}
              selectedValues={usuariosAtribuido}
              onSelect={quandoSelecionadoUsuario}
              onRemove={quandoRemoverUsuario}
              displayValue="nome"
            />
          </div>

          <div className={styles.botaoCadastrar}>
            <center>
              <button className={styles.button} onClick={Cadastrar}>
                Cadastrar
              </button>
            </center>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.textoRight}>
            <p className={styles.tituloRight}>
              Crie uma tarefa para gerenciar e organizar suas atividades
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
