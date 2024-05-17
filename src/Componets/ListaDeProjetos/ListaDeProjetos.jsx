import React, { useState, useEffect } from "react";
import styles from "./ListaDeProjetos.module.css";
import ApiService from "../../services/ApiService";
import CardProjeto from "../CardProjeto/CardProjeto";
import CardTarefa from "../CardTarefa/CardTarefa";

export default function ListaDeProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  async function BuscarDadosProjetosPorUsuario() {
    const response = await ApiService.get("/Projeto/listarProjeto");
    console.log(response.data);
    if (response.status == 200) {
      setProjetos(response.data);
    }
  }
  async function BuscarDadosTarefasPorUsuario() {
    const response = await ApiService.get("/Tarefa/listarTarefa");
    if (response.status == 200) {
      setTarefas(response.data);
    }
  }

  useEffect(() => {
    BuscarDadosProjetosPorUsuario();
    BuscarDadosTarefasPorUsuario();
  }, []);

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
          <CardTarefa tarefa={tarefa} key={key} />
        ))}
      </div>
    </div>
  );
}
