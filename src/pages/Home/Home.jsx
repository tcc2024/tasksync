import React from "react";
import styles from "./Home.module.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";

export default function Home({ tituloProjeto, descricaoProjeto, tituloTarefa, descricaoTarefa }) {
  return (
    <div className={styles.container}>
      <div className={styles.dados}>
        <p className={styles.projeto}>Projetos Recentes</p>
        <div className={styles.card}>
          <p className={styles.titulo}>{tituloProjeto}</p>
          <hr />
          <p className={styles.descricao}>{descricaoProjeto}</p>
        </div>
        <p className={styles.tarefas}>Tarefas Recentes</p>
        <div className={styles.card}>
          <p className={styles.titulo}>{tituloTarefa}</p>
          <hr />
          <p className={styles.descricao}>{descricaoTarefa}</p>
        </div>
      </div>
    </div>
  );
}
