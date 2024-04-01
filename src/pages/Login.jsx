import React from "react";
import "./Login.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import icone from "../assets/Email.png";

export default function Login() {
  return (
    <div className="background">
      <div className="left">
        <h1 id="login">Sign-Up</h1>
      </div>
      <div className="right">
        <h1 id="title">Criar Conta</h1>
        <input
          id="input-usuario"
          type="email"
          name="email"
          className="inputs"
          placeholder="Usuario"
        />
      </div>
      <div>
        <input
          id="input-email"
          type="text"
          name="usuario"
          className="inputs"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          id="input-senha"
          type="password"
          name="email"
          placeholder="Senha"
          className="input-field"
        />
      </div>
    </div>
  );
}
