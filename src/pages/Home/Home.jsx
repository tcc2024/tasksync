import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import ApiService from "../../services/ApiService";
import "./Home.css";

export default function Home() {
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
    debugger;
    const response = await ApiService.get("/Usuario/getuserdata");
    if (response.status == 200) {
      setUsuario(response.data);
    }
  }

  return (
    <div className="container">
      
      <div className="div-top">
        <button className>Novo Projeto</button>
        <button className>Nova Tarefa</button>
        <div className="div-left">
          
        </div>
      </div>
    </div>
  );
}
