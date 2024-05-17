import React from "react";
import styles from "./CardTarefa.module.css";

export default function CardTarefa({ tarefa }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={() => (window.location.href = "/menuprojeto")}
      >
        <div className={styles.header}>
          <p className={styles.titulo}>{tarefa.titulo}</p>
          <hr />
        </div>
        <div className={styles.content}>
          <div className={styles.descricaoContainer}>
            <p className={styles.descricao}>{tarefa.descricao}</p>
          </div>

          <div className={styles.footer}>
            <p className={styles.projeto}>{tarefa.projeto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
