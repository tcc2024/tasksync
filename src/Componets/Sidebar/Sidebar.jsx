import React from "react";
import styles from "./Sidebar.module.css";
import logo from "../../assets/Logo.svg";
import texto from "../../assets/Task.Sync.svg";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} className={styles.pena} />
        <img src={texto} />
      </div>

      <div
        className={styles.botaomenu}
        onClick={() => (window.location.href = "/home")}
      ></div>
      <div
        className={styles.botaocalendario}
        onClick={() => (window.location.href = "/calendario")}
      ></div>
      <div
        className={styles.botaoprojetos}
        onClick={() => (window.location.href = "/projetos")}
      ></div>
      <div
        className={styles.botaoconfig}
        onClick={() => (window.location.href = "/config")}
      ></div>
    </div>
  );
}
