import React, { useState } from "react";
import styles from "./CardTarefa.module.css";
import ModalEditarTarefa from "../Modal/ModalEditarTarefa/ModalEditarTarefa";

export default function CardTarefa({ tarefa }) {
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(null);


  return (
    <>
      <ModalEditarTarefa 
      modalAberto={modalTarefaAberto} 
      setModalAberto={setModalTarefaAberto}
      idTarefaSelecionada={idSelecionado}
      />

      <div className={styles.container} onClick={() => setModalTarefaAberto(true)}>
        <div className={styles.card}>
          <div className={styles.header}>
            <p className={styles.titulo}>{tarefa.nome}</p>
          </div>
          <hr />
          <div className={styles.content}>
            <div className={styles.descricaoContainer}>
              <p className={styles.descricao}>{tarefa.descricao}</p>
            </div>
            <div className={styles.footer}>
              <p className={styles.projeto}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
