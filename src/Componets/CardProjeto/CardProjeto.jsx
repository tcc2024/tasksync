import React from "react";
import styles from "./CardProjeto.module.css";
import { useNavigate } from "react-router-dom";

export default function CardProjeto({ projeto }) {
  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        onClick={() => { navigate("/menuprojeto", { state: projeto }) }}
      >
        <div className={styles.header}>
          <p className={styles.titulo}>{projeto.nome}</p>
          <hr />
        </div>
        <div className={styles.content}>
          <p className={styles.descricao}>{projeto.descricao}</p>
        </div>
      </div>
    </div>
  );
}
