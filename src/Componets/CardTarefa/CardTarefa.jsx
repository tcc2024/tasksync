import React from "react";
import styles from "./CardTarefa.module.css";

export default function CardTarefa({ tarefa }) {
  return (
    <div className={styles.container}>
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
  );
}
