import React from 'react'
import HeaderProjeto from '../../Componets/Header/HeaderProjeto'
import Sidebar from "../../Componets/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import styles from "./MenuProjeto.module.css"

export default function MenuProjeto() {
  return (
    <div className={styles.container}>
    <Sidebar />
    <div className={styles.appContainer}>
      <HeaderProjeto />
      <div className={styles.pages}>
        <div className={styles.afazer}>

        </div>
        <div classname={styles.emandamento}>

        </div>
        <div classname={styles.concluida}>

        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
  )
}
