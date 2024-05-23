import React, { useState } from "react";
import styles from "./Header.module.css";
import ModalCadastroProjeto from "../Modal/ModalCadastroProjeto";
import ModalCadastroTarefa from "../Modal/ModalCadastroTarefa";

export default function Header() {
  const [modalProjetoAberto, setModalProjetoAberto] = useState(false);
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);

  return (
    <>
      <>
        <ModalCadastroProjeto
          modalAberto={modalProjetoAberto}
          setModalAberto={setModalProjetoAberto}
        />
        <ModalCadastroTarefa
          modalAberto={modalTarefaAberto}
          setModalAberto={setModalTarefaAberto}
        />
      </>
      <div className={styles.container}>
        <button className={styles.btn} onClick={() => setModalProjetoAberto(true)}>
          Criar Projeto
        </button>
        <button className={styles.btn} onClick={() => setModalTarefaAberto(true)}>
          Criar Tarefa
        </button>
      </div>
    </>
  );
}
