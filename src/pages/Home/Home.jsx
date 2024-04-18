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
    const response = await ApiService.get("/Usuario/getuserdata");
    if (response.status == 200) {
      setUsuario(response.data);
    }
  }

  return (
    <div className="container">
      <div className="div-left">
      </div> 
      <div className="right">
        <div className="div-top">
          <button>Novo Projeto</button>
          <button>Nova Tarefa</button>
        </div>
        <div className="div-bottom">
          <div className="card">
            <p>Nome: Lourival Cicero</p>
            <p>Email: lourijr@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
