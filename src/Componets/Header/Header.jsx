import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import ModalEditarUsuario from "../Modal/ModalEditarUsuario";
import ModalCadastroProjeto from "../Modal/ModalCadastroProjeto/ModalCadastroProjeto";
import ModalCadastroTarefa from "../Modal/ModalCadastroTarefa/ModalCadastroTarefa";
import ApiService from "../../services/ApiService";

export default function Header({refresh}) {
  const [modalProjetoAberto, setModalProjetoAberto] = useState(false);
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [tarefas, setTarefas] = useState([]);

  async function buscarTarefas() {
    try {
      const response = await ApiService.get("/Tarefa/listarTarefas");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao listar as tarefas:", error);
    }
  }

  return (
    <>
      <>
        <ModalEditarUsuario
          modalAberto={modalUsuarioAberto}
          setModalAberto={setModalUsuarioAberto}
          refresh={refresh}
        />
        <ModalCadastroProjeto
          modalAberto={modalProjetoAberto}
          setModalAberto={setModalProjetoAberto}
          refresh={refresh}
        />
        <ModalCadastroTarefa
          modalAberto={modalTarefaAberto}
          setModalAberto={setModalTarefaAberto}
          buscarTarefas={buscarTarefas}
          refresh={refresh}
        />
      </>
      <div className={styles.container}>
        <button
          className={styles.btn}
          onClick={() => setModalUsuarioAberto(true)}
        >
          Editar Usuario
        </button>
        <button
          className={styles.btn}
          onClick={() => setModalProjetoAberto(true)}
        >
          Criar Projeto
        </button>
        <button
          className={styles.btn}
          onClick={() => setModalTarefaAberto(true)}
        >
          Criar Tarefa
        </button>
      </div>
    </>
  );
}
