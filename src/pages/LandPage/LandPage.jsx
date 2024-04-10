import React from "react";
import "./LandPage.css"
import { Link } from "react-router-dom";


export default function LandPage() {
  return (
    <div className="top">
        <Link to={"/Cadastrar"}><button className="cadastrar">Cadastrar</button></Link>
        <Link to={"/Login"}><button className="entrar">Entrar</button></Link>
    </div>
  );
}