import React, { useEffect, useState } from "react";
import ListaDeProjetos from "../../Componets/ListaDeProjetos/ListaDeProjetos";
import AuthService from "../../services/AuthServices";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

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
    <div>
      <ListaDeProjetos projetos={projetos} />
    </div>
  );
}
