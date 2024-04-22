import React from "react";
import { Link } from "react-router-dom";
import "./Calendario.css";

export default function Calendario() {
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
        <div className="div-top-calendar">
            <h1>Calendário</h1>
        </div>
      </div>
    </div>
  );
}
