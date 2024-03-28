import React from "react";
import "./Login.css";
import "@fontsource/inter";
import icone from "../assets/Email.png";

export default function Login() {
  return (
    <div className="background">
      <div className="left">
        <h1 id="login">Sign Up</h1>
      </div>
      <div className="right">
        <div className="input-container">
          <div className="icon-container">
            <img src={icone} alt="Email Icon" className="icon" />
          </div>
          <input
            id="input"
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
          />
        </div>
        <br />
        <br />
        <br />
        <input 
        id="input"
         type="password" 
         name="senha" placeholder="Senha" />
      </div>
    </div>
  );
}
