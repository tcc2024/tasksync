import React from "react";
import styles from "./Login.module.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import ToastService from "../../services/ToastService";
import { useEffect, useState } from "react";
import elipse1 from '../../assets/Ellipse 1.png'
import elipse2 from '../../assets/Ellipse 2.png'

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };


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

      ToastService.Success("Seja Bem Vindo" + email)

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
      <div className={styles.left}>
        <p className={styles.subTitle}>Log - In</p>
        <div className={styles.titulo}>
          <p className={styles.title}>Bem Vindo de Volta</p>
        </div>
      </div>
      <div className={styles.center}>
        <h2>Faça Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.email}
        />
        <input
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.senha}
          type={mostrarSenha ? 'text' : 'password'} />

        <div>
          <a
            onClick={toggleMostrarSenha}
          >
            {mostrarSenha ? 'Ocultar Senha' : 'Mostrar Senha'}
          </a>
        </div>


        <button onClick={Login} className={styles.btn}>Entrar</button>
      </div>
    </div>
  );
}
