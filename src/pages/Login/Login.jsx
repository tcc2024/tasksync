import React from "react";
import "./Login.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";

export default function Login() {
    return (
      <div className="background">
        <div className="center">
          <div>
            <h1 id="title">Criar Conta</h1>
          </div>
          <div>
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
              className="inputs"
              placeholder="Senha"
            />
            <div>
              <h5>Já Tem Uma Conta? Entre!</h5>
            </div>
            <div>
              <button className="btn">Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }