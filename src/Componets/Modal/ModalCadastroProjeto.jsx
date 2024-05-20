import { useState } from "react";
import Modal from "react-modal";
import ApiService from "../../services/ApiService";
import ToastService from "../../services/ToastService";
import styles from "./ModalCadastroProjeto.module.css";

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
    console.log("test");
    try {
      const body = {
        nome,
        descricao,
      };

      console.log(body);
      await ApiService.post("/Projeto/CriarProjeto", body);
      ToastService.Success("Projeto Criado com Sucesso");
      setModalAberto(false);
    } catch (error) {
      ToastService.Error("Erro ao Criar Projeto");
    }
  }

  function FecharModal() {
    setModalAberto(false)
}

  return (
    <Modal isOpen={modalAberto} style={customStyles} onRequestClose={FecharModal}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h3 className={styles.title}>Vamos Criar um Projeto</h3>

          <p className={styles.nomeDescProjeto}>Nome do Projeto</p>
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <br />
          <p className={styles.nomeDescProjeto}>Descrição do Projeto</p>
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <br />
          <center>
            <button className={styles.button} onClick={CadastrarProjeto}>
              Criar Projeto
            </button>
          </center>
        </div>
        <div className={styles.right}>
          <button onClick={FecharModal}>Fechar</button>
          <p className={styles.tituloRight}>Crie um projeto para gerenciar e organizar suas tarefas </p>
        </div>
      </div>
    </Modal>
  );
}
