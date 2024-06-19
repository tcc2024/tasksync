import React from "react";
import styles from "./Cadastrar.module.css";
import "@fontsource/inter";
import "@fontsource/inter/400.css";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";
import ToastService from "../../services/ToastService";
import { useEffect, useState } from "react";

export default function Cadastrar() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");


  async function CadastrarUsuario() {
    if (email != null && email != ""){
    if (email == confirmarEmail){
    if (senha != null && senha != ""){
    if (senha == confirmarSenha){
    if (nome != null && nome != ""){

      try {
        const body = new URLSearchParams({
          nome,
          email,
          senha,
          url: ""
        });
        
        const response = await ApiService.post("/Usuario/Cadastrar", body);
        const token = response.data.token;
        
        AuthService.SalvarToken(token);
        
        navigate("/home");
      } catch (error) {
        if (error.response?.status == 401) {
          ToastService.Error(
            "Erro ao realizar cadastro"
            );
            return;
          }
          ToastService.Error(
            "Erro ao realizar cadastro",
            "Houve um erro no servidor ao realizar o seu cadastro\r\nTente novamente mais tarde."
            );
          }
        } else {
          ToastService.Error(
            "Erro ao realizar cadastro",
            "Nome inválido"
            );
          }
        } else {
          ToastService.Error(
            "Erro ao realizar cadastro",
            "Senha não confere com Confirmar Senha"
            );
        }
        } else {
          ToastService.Error(
            "Erro ao realizar cadastro",
            "Senha inválida"
            );
          }
        } else {
          ToastService.Error(
            "Erro ao realizar cadastro",
            "Email não confere com Confirmar Email"
            );
        }
      } else {
        ToastService.Error(
          "Erro ao realizar cadastro",
          "Email inválido"
        );
      }
  }
  return (
    <div className={styles.background}>
      <div className={styles.center}>
        <h2>Cadastre-se</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.email}
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
          placeholder="Confirmar Email"
          value={confirmarEmail}
          onChange={(e) => setConfirmarEmail(e.target.value)}
          className={styles.email}
        />
        <input
          type="text"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={styles.senha}
          />
        <input
          type="text"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className={styles.senha}
          />


        <button onClick={CadastrarUsuario} className={styles.btn}>Cadastrar</button>
      </div>
    </div>
  );
}