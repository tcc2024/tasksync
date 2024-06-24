import React from "react";
import styles from "./Cadastrar.module.css";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import ToastService from "../../services/ToastService";
import { useEffect, useState } from "react";

export default function CadastrarUsu() {

  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Cadastrar() {
    try {
      const body = {
        nome,
        email,
        senha,
        url: ""
      };

      console.log(body)
      const response = await ApiService.post("/Usuario/Cadastrar", body);
      const token = response.data.token;
      AuthService.SalvarToken(token);
      console.log(response)
      console.log(token)

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        ToastService.Error("E-mail já cadastrado. Por favor, use outro e-mail.");
      } else {
        ToastService.Error("Erro ao cadastrar usuário");
      }
    }

  }

  return (
    <div className={styles.background}>
      <div className={styles.left}>
      <p className={styles.subTitle}>Log - In</p>
        <div className={styles.titulo}>
          <p className={styles.title}>Seja Bem Vindo!</p>
        </div>
      </div>
      <div className={styles.center}>
        <h2>Cadastre-se</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.usuario}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.email}
        />
        <input
          type="text"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.senha}
        />
        <button onClick={Cadastrar} className={styles.btn}>Cadastrar</button>
      </div>
    </div>
  );

}

