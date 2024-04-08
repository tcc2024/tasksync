import React from "react";
import "./Cadastrar.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";

export default function Cadastrar() {
    return (
      <div className="background">
        <div className="center">
          <div>
            <h1 id="title">Sign Up</h1>
          </div>
          <div>
          <input
              id="input-usuario"
              type="text"
              name="usuario"
              className="inputs"
              placeholder="Usuário"
            />
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
              className="inputs"
              placeholder="Senha"
            />
            <div>
              <h5>Já Tem Uma Conta? Entre</h5>
            </div>
            <div>
              <button onclassName="btn">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }