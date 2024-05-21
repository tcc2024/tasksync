import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import Modal from "react-modal";
import Multiselect from "multiselect-react-dropdown";

export default function ModalCadastroTarefa({
  modalAberto,
  setModalAberto,
  tarefas,
  buscarTarefas,
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
  const [projetos, setProjetos] = useState([]);
  const [idProjetoSelecionado, setIdProjetoSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");

  async function Cadastrar() {
    try {
      const body = {
        nome,
        descricao,
        dataEntrega,
        projeto: {
          id: idProjetoSelecionado,
        },
        usuario: {
          id: usuario,
        }
      };

      await ApiService.post("/Tarefa/CriarTarefa", body);

      setModalAberto(false);
      ToastService.Success("Tarefa Criada com Sucesso");
      await buscarTarefas();
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

  useEffect(() => {
    BuscarProjetos();
  }, []);

  function FecharModal() {
    setModalAberto(false);
  }

  function selectAlterado(event) {
    setIdProjetoSelecionado(event.target.value);
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
      <h2>Criar Tarefa</h2>
      <button onClick={FecharModal}>Fechar</button>
      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
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
      <Multiselect
                options={tarefas}
                selectedValues={projetos}
                onSelect={quandoSelecionadoUsuario}
                onRemove={quandoRemoverDependencia}
                displayValue="nome"
            />

      <button onClick={Cadastrar}>Cadastrar</button>
    </Modal>
  );
}
