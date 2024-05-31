import React from "react";
import styles from "./LandPage.module.css";
import { Link } from "react-router-dom";

export default function LandPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to={"/Cadastrar"}>
          <button className={styles.cadastrar}>Cadastrar</button>
        </Link>
        <Link to={"/Login"}>
          <button className={styles.entrar}>Entrar</button>
        </Link>
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
