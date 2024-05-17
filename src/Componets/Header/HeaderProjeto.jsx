import React from "react";
import styles from "./HeaderProjeto.module.css";

export default function HeaderProjeto() {
  return (
    <div className={styles.container}>
      <div className={styles.lugar}> 
        <p>TaskSync</p>
      </div>
    </div>
  );
}
