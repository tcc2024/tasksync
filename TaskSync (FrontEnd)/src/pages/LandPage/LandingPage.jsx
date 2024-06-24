import React from "react";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>

        <button className={styles.cadastrar} onClick={() => (window.location.href = "/cadastrar")}>Cadastrar</button>
        <button className={styles.entrar} onClick={() => (window.location.href = "/login")}>Entrar</button>
      </div>
      <div className={styles.pages}>
        <div className={styles.content}>
          <div className={styles.texto}>
            <p>Gerencias suas tarefas, projetos e muito mais</p>
            <center>
              <button className={styles.useFree}>Use Gratuitamente</button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
