import React from "react";
import styles from "./LandPage.module.css"
import { Link } from "react-router-dom";


export default function LandPage() {
  return (
    <div className={styles.top}>
        <Link to={"/Cadastrar"}><button className={styles.cadastrar}>Cadastrar</button></Link>
        <Link to={"/Login"}><button className={styles.entrar}>Entrar</button></Link>
    </div>
  );
}