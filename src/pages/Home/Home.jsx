import React, { useEffect, useState } from "react";
import ListaDeProjetos from "../../Componets/ListaDeProjetos/ListaDeProjetos";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { ToastContainer } from "react-toastify";
import styles from "./Home.module.css";
import ApiService from "../../services/ApiService";

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({})
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
    BuscarDadosUsuario();
  }, []);

  async function BuscarDadosUsuario() {
    const response = await ApiService.get("/Usuario/getuserdata");
    if (response.status == 200) {
      setUsuario(response.data);
    }
  }
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
