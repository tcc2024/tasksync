import React from "react";
import "./LandPage.css"
import { Link } from "react-router-dom";


export default function LandPage() {
  return (
    <div className="top">
        <Link to={"/cadastrar"}><button className="cadastrar">Cadastrar</button></Link>
        <Link to={"/login"}><button className="entrar">Entrar</button></Link>
    </div>
  );
}