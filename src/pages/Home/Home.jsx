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
  const [usuario, setUsuario] = useState({});
  const [projetos, setProjetos] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  async function BuscarDadosProjetosPorUsuario() {
    const response = await ApiService.get("/Projeto/listarProjeto");
    console.log(response.data);
    if (response.status == 200) {
      setProjetos(response.data);
    }
  }

  async function BuscarDadosTarefasPorUsuario() {
    const response = await ApiService.get("/Tarefa/listarTarefa");
    if (response.status == 200) {
      setTarefas(response.data);
    }
  }

  async function refresh() {
    await BuscarDadosProjetosPorUsuario();
    await BuscarDadosTarefasPorUsuario();
  }

  useEffect(() => {
    VerificarLogin();
    BuscarDadosUsuario();
    BuscarDadosProjetosPorUsuario();
    BuscarDadosTarefasPorUsuario();
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
        <Header refresh={refresh} />
        <div className={styles.pages}>
          <ListaDeProjetos projetos={projetos} tarefas={tarefas} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
