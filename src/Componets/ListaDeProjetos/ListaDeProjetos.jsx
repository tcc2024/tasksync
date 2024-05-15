import React, { useState } from "react";
import styles from "./ListaDeProjetos.module.css";

export default function ListaDeProjetos({ projetos }) {
  return (
    <div className={styles.container}>
      {projetos.map((projeto) => (
        <div className={styles.dados}>
          <p className={styles.projeto}>Projetos Recentes</p>
          <div className={styles.card}  onClick={() => (window.location.href = "/menuprojeto" )}>
            <p className={styles.titulo}>{projeto.tituloProjeto}</p>
            <hr />
            <p className={styles.descricao}>{projeto.descricaoProjeto}</p>
          </div>
          <p className={styles.tarefas}>Tarefas Recentes</p>
          <div className={styles.card}>
            <p className={styles.titulo}>{projeto.tituloTarefa}</p>
            <hr />
            <p className={styles.descricao}>{projeto.descricaoTarefa}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
