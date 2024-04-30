import React, { useState } from "react";
import styles from "./Header.module.css";
import ModalCadastroProjeto from "../Modal/ModalCadastroProjeto";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <ModalCadastroProjeto
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
      ></ModalCadastroProjeto>
      <div className={styles.container}>
        <button onClick={() => setModalAberto(true)}>Criar Projeto</button>
        <button>Criar Tarefa</button>
      </div>
    </>
  );
}
