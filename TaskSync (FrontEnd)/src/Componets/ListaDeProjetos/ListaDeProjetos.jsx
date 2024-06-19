import React, { useState, useEffect } from "react";
import styles from "./ListaDeProjetos.module.css";
import ApiService from "../../services/ApiService";
import CardProjeto from "../CardProjeto/CardProjeto";
import CardTarefa from "../CardTarefa/CardTarefa";

export default function ListaDeProjetos({ projetos, tarefas }) {
  return (
    <div className={styles.container}>
      <p className={styles.projeto}>Projetos</p>
      <div className={styles.projetos}>
        {projetos.map((projeto, key) => (
          <CardProjeto projeto={projeto} key={key} />
        ))}
      </div>

      <p className={styles.projeto}>Tarefas</p>
      <div className={styles.projetos}>
        {tarefas.map((tarefa, key) => (
          console.log(tarefa),
          <CardTarefa tarefa={tarefa} key={key} />
        ))}
      </div>
    </div>
  );
}
