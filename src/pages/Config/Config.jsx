import React from "react";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import styles from "./Config.module.css";
import AuthService from "../../services/AuthServices";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import ModalEditarUsuario from "../../Componets/Modal/ModalEditarUsuario";
import { Navigate, useNavigate } from "react-router-dom";

export default function Config() {
  const navigate = useNavigate();
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);

  
  function Sair() {
    AuthService.Sair();
    navigate("/login");

    <ModalEditarUsuario
      modalAberto={modalUsuarioAberto}
      setModalAberto={setModalUsuarioAberto}
    />;
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.pages}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className={styles.title}>Configuração de Usuário</h1>
            </div>

            <div className={styles.functions}>
              <div className={styles.config}>
                <h3 className={styles.text}>Editar Perfil</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Idioma</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Temas</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Permissões</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Acessibilidade</h3>
              </div>
              <div className={styles.config}>
                <h3 className={styles.text}>Politicas de Privacidade</h3>
              </div>
              <div className={styles.espaçoBotao}>
                <center>
                  <button className={styles.botaoSair} onClick={Sair}>
                    Sair da Conta
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
