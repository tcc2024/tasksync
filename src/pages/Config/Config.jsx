import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { ToastContainer } from "react-toastify";
import styles from "./Config.module.css";

export default function Config() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>Configuração de Usuário</h1>
            </div>
            <hr />
            <div className={styles.functions}>
              <div className={styles.config}>
                <h3 className={styles.text}>Editar Perfil</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Idioma</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Temas</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Permissões</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Acessibilidade</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Politicas de Privacidade</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
