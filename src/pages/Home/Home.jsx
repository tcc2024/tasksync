import React, { useEffect, useState } from "react";
import ListaDeProjetos from "../../Componets/ListaDeProjetos/ListaDeProjetos";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import { ToastContainer } from "react-toastify";
import styles from "./Home.module.css"


export default function Home() {
  const navigate = useNavigate();
  const [projetos, setProjetos] = useState([
    {
      tituloTarefa: "Banco de Dados",
      descricaoTarefa: "AAAAAAAAAAAAAA",
      tituloProjeto: "TaskSync",
      descricaoProjeto: "TaskSync",
    },
  ]);

  useEffect(() => {
    VerificarLogin();
  }, []);

  function VerificarLogin() {
    const usuarioEstaLogado = AuthService.VerificarSeUsuarioEstaLogado();
    if (!usuarioEstaLogado) {
      navigate("/");
    }
  }

  return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.appContainer}>
          <Header />
          <div className={styles.pages}>
            <ListaDeProjetos projetos={projetos} />
          </div>
        </div>
        <ToastContainer />
      </div>
  );
}
