import React, { useState } from "react";
import styles from "./Header.module.css";
import ModalCadastroProjeto from "../Modal/ModalCadastroProjeto";
import ModalCadastroTarefa from "../Modal/ModalCadastroTarefa";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <ModalCadastroProjeto
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
      ></ModalCadastroProjeto>
      <>
        <ModalCadastroTarefa
          modalAberto={modalAberto}
          setModalAberto={setModalAberto}
        ></ModalCadastroTarefa>
      </>
      <div className={styles.container}>
        <button className={styles.btn} onClick={() => setModalAberto(true)}>
          Criar Projeto
        </button>
        <button className={styles.btn} onClick={() => setModalAberto(true)}>
          Criar Tarefa
        </button>
      </div>
    </>
  );
}
