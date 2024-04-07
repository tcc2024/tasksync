import React from "react";
import "./Login.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";

export default function Login() {
    return (
      <div className="background">
        <div className="center">
          <div>
            <h1 id="title">Log-In</h1>
          </div>
          <div>
            <input
              id="input-email"
              type="text"
              name="usuario"
              className="inputs"
              placeholder="Email ou Usuário"
            />
          </div>
          <div>
            <input
              id="input-senha"
              type="password"
              name="email"
              className="inputs"
              placeholder="Senha"
            />
            <div>
              <h5>Não Tem Uma Conta? Cadastre-se</h5>
            </div>
            <div>
              <button className="btn">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }