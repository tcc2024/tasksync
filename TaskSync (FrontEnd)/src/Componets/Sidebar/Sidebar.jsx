import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/Logo.svg";
import texto from "../../assets/Task.Sync.svg";
import Home from "../../assets/HomePage.png"
import Calendario from "../../assets/Calendar31.png"
import Config from "../../assets/Settings.png"


export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div
        className={styles.botaomenu}
        onClick={() => (window.location.href = "/home")}

      ><img className={styles.imagem} src={Home} /> Home
      </div>

      <div
        className={styles.botaocalendario}
        onClick={() => (window.location.href = "/calendario")}
      ><img className={styles.imagem} src={Calendario} /> Calendário</div>
      <div
        className={styles.botaoconfig}
        onClick={() => (window.location.href = "/config")}
      ><img className={styles.imagem} src={Config} />Configurações</div>
    </div>
  );
}
