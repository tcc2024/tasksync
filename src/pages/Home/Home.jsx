import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.dados}>
        <p className={styles.projeto}>Projetos Recentes</p>
        <div className={styles.card}>
          <p className={styles.titulo}>RECEBA</p>
          <hr />
          <p className={styles.descricao}>SIUUUUU</p>
        </div>
        <p className={styles.tarefas}>Tarefas Recentes</p>
        <div className={styles.card}>
          <p className={styles.titulo}>RECEBA</p>
          <hr />
          <p className={styles.descricao}>SIUUUUU</p>
        </div>
      </div>
    </div>
  );
}
