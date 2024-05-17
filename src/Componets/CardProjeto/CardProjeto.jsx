import React from "react";
import styles from "./CardProjeto.module.css";

export default function CardProjeto({ projeto }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={() => (window.location.href = "/menuprojeto")}
      >
        <div className={styles.header}>
          <p className={styles.titulo}>{projeto.nome}</p>
          <hr />
        </div>
        <div className={styles.content}>
          <p className={styles.descricao}>{projeto.descricao}</p>
        </div>
      </div>
    </div>
  );
}
