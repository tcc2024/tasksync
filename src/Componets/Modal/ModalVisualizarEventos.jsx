import { useState, useEffect } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalCadastroProjeto.module.css";
import Multiselect from "multiselect-react-dropdown";
import "@schedule-x/theme-default/dist/index.css";

export default function ModalVisualizarEvento({
  modalAberto,
  setModalAberto,
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

  const [usuarios, setUsuarios] = useState([])
  const [usuarioAtribuido, setUsuarioAtribuido] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
 
  async function Cadastrar() {
    try {

      //const usuariosAtribuidos = usuarioAtribuido.map((usuario) => ( usuario.id ));

      async function BuscarDadosEventoPorID() {
        const response = await ApiService.get("/Eventos/listarEvento");
        if (response.status == 200) {
                setNome(evento.nome)
                setDescricao(evento.descricao)
        }
      }
    
      useEffect(() => {
        BuscarDadosEventoPorID();
      }, []);

      await ApiService.post("/Eventos/listarEventoPorID", evento.id);

      setModalAberto(false);
      ToastService.Success("Evento Visualizado com Sucesso");
      // await buscarEventos();
    } catch (error) {
      ToastService.Error("Erro ao Visualizar Evento");
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
    setModalAberto(false);
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
      isOpen={modalAberto}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={FecharModal}
    >
      <h2 className={styles.title}></h2>
      <button onClick={FecharModal}>Fechar</button>
      <p
        className={styles.nomeDescProjeto}
        value={nome}
      />
      <p
        className={styles.nomeDescProjeto}
        value={descricao}
      />{/*
      <p
        placeholder="Data de Entrega"
        value={dataEntrega}
        type="date"
        onChange={(e) => setDataEntrega(dataHora)}
  />
      <Multiselect
        options={usuarios}
        selectedValues={usuarioAtribuido}
        onSelect={quandoSelecionadoUsuario}
        onRemove={quandoRemoverUsuario}
        displayValue="nome"/>

        <select value={idProjetoSelecionado} onChange={selectAlterado}>
          <option value="" disabled>
            Selecione Um Projeto
          </option>
          {projetos.map((projeto) => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>
      
      <button className={styles.button} onClick={Cadastrar}>Cadastrar</button>*/}
    </Modal>
  );
}
