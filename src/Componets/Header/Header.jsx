import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <button className="novos">Novo Projeto</button>
      <button className="novos">Nova Tarefa</button>
    </div>
  );
}
