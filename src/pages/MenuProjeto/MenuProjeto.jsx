import React from "react";
import HeaderProjeto from "../../Componets/Header/HeaderProjeto";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import styles from "./MenuProjeto.module.css";

export default function MenuProjeto() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <HeaderProjeto />
        <div className={styles.pages}>
          <div className={styles.column}>
            <h2>
              <center>A Fazer</center>
            </h2>
            <div className={styles.task}>Tarefa 1</div>
            <div className={styles.task}>Tarefa 2</div>
            <div className={styles.task}>Tarefa 2</div>
            <div className={styles.task}>Tarefa 2</div>

            <center>
              <button className={styles.botao}>Adicionar Tarefa</button>
            </center>
          </div>
          <div className={styles.column}>
            <h2>
              <center>Em Andamento</center>
            </h2>
            <div className={styles.task}>Tarefa 3</div>
            <div className={styles.task}>Tarefa 4</div>
            <div className={styles.task}>Tarefa 2</div>
            <div className={styles.task}>Tarefa 2</div>
            <div className={styles.task}>Tarefa 2</div>

            <center>
              <button className={styles.botao}>Adicionar Tarefa</button>
            </center>
          </div>
          <div className={styles.column}>
            <h2>
              <center>Concluída</center>
            </h2>
            <div className={styles.task}>Tarefa 5</div>
            <div className={styles.task}>Tarefa 6</div>
            <center>
              <button className={styles.botao}>Adicionar Tarefa</button>
            </center>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
