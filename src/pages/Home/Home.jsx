import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import ApiService from "../../services/ApiService";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ projeto }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    VerificarLogin();
  }, []);

  function VerificarLogin() {
    const usuarioEstaLogado = AuthService.VerificarSeUsuarioEstaLogado();
    if (!usuarioEstaLogado) {
      navigate("/");
    }

    BuscarDadosUsuario();
  }

  async function BuscarDadosUsuario() {
    const response = await ApiService.get("/Usuario/getuserdata");
    if (response.status == 200) {
      setUsuario(response.data);
    }
  }

  return (
    <div className="container">
      <div className="div-left">
        <Link to={"/home"}>
          <div className="botao-menu"></div>
        </Link>
        <Link to={"/projetos"}>
          <div className="botao-projetos"></div>
        </Link>
        <Link to={"/calendario"}>
          <div className="botao-calendario"></div>
        </Link>
        <Link to={"/config"}>
          <div className="botao-config"></div>
        </Link>
      </div>
      <div className="right">
        <div className="div-top">
          <button className="novos">Novo Projeto</button>
          <button className="novos">Nova Tarefa</button>
        </div>
        <div className="div-bottom">
          <p className="projetos">Projetos Recentes</p>
          <div className="card">
            <p className="title">{projeto.tituloProjeto}</p>
            <hr />
            <p className="descricao">{projeto.descricaoProjeto}</p>
          </div>
          <p className="projetos">Tarefas Recentes</p>
          <div className="card">
            <p className="title">{projeto.tituloTarefa}</p>
            <hr />
            <p className="descricao">{projeto.descricaoTarefa}</p>
            <p className="title-project">{projeto.tituloProjeto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
