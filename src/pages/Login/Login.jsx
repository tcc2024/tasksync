import React from "react";
import styles from "./Login.module.css"
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import ToastService from "../../services/ToastService";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    VerificarLogin();
  }, []);

  function VerificarLogin() {
    const usuarioEstaLogado = AuthService.VerificarSeUsuarioEstaLogado();
    if (usuarioEstaLogado) {
      navigate("/home");
    }
  }

  async function Login() {
    try {
      const body = new URLSearchParams({
        email,
        senha,
      });

      const response = await ApiService.post("/Usuario/Login", body);
      const token = response.data.token;

      AuthService.SalvarToken(token);

      navigate("/home");
    } catch (error) {
      if (error.response?.status == 401) {
        ToastService.Error(
          "Erro ao realizar login",
          "E-mail e/ou senha inválidos!"
        );
        return;
      }
      ToastService.Error(
        "Erro ao realizar login",
        "Houve um erro no servidor ao realizar o seu login\r\nTente novamente mais tarde."
      );
    }
  }
  return (
    <div className={styles.background}>
      <div className={styles.center}>
        <div>
          <h1 id="title">Log-In</h1>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="input-email"
            type="text"
            name="usuario"
            className={styles.inputs}
            placeholder="Email ou Usuário"
          />
        </div>
        <div>
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            id="input-senha"
            type="password"
            name="email"
            className={styles.inputs}
            placeholder="Senha"
          />
          <div>
            <h5>Não Tem Uma Conta? Cadastre-se</h5>
          </div>
          <div>
            <button onClick={Login} className={styles.btn}>
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
