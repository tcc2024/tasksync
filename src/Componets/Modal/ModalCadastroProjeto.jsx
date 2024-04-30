import { useState } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";

export default function ModalCadastroProjeto({ modalAberto, setModalAberto }) {
  Modal.setAppElement("#root");
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

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  async function CadastrarProjeto() {
    try {
      const body = {
        nome,
        descricao,
      };

      await ApiService.post("/Projeto/CriarProjeto", body);
      ToastService.Success("Projeto Criado com Sucesso");
      setModalAberto(false);
    } catch (error) {
      ToastService.Error("Erro ao Criar Projeto");
    }
  }

  return (
    <Modal isOpen={modalAberto} style={customStyles}>
      <h2>Criar Projeto</h2>
      <button
        onClick={() => {
          setModalAberto(false);
        }}
      >
        Fechar
      </button>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <button>Criar Projeto</button>
    </Modal>
  );
}
