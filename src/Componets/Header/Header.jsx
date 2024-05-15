import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import ModalCadastroProjeto from "../Modal/ModalCadastroProjeto";
import ApiService from "../../services/ApiService";

export default function Header() {
  const [modalAberto, setModalAberto] = useState(false);
  const [usuario, setUsuario] = useState({});

  
  useEffect(() => {
    BuscarDadosUsuario();
  }, []);
   
  async function BuscarDadosUsuario() {
    debugger;
    const response = await ApiService.get("/Usuario/getuserdata");
    if (response.status == 200) {
      setUsuario(response.data);
    }
  }




  return (
    <>
    <div>{usuario.id}</div>
      <ModalCadastroProjeto
        modalAberto={modalAberto}
        setModalAberto={setModalAberto}
      ></ModalCadastroProjeto>
      <div className={styles.container}>
        <button className={styles.btn}onClick={() => setModalAberto(true)}>Criar Projeto</button>
        <button className={styles.btn}>Criar Tarefa</button>
      </div>
    </>
  );
}
