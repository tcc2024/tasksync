import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import ApiService from "../../services/ApiService";

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
    <div>
      <div>Homeeeeeeee</div>
      <div>{usuario.id}</div>
    </div>
  );
}
