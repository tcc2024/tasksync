import React, { useEffect, useState } from "react";
import { Modal } from "react-modal";
import ApiService from "../services/ApiService";
import ToastService from "../services/ToastService";

export default function ModalCriarProjeto({
  modalAberto,
  setModalAberto,
  buscarProjeto,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  Modal.SetAppElement("#root");

  const [tituloProjeto, setTituloProjeto] = useState("");
  const [descricaoProjeto, setDescricaoProjeto] = useState("");
  const [previa, setPrevia] = useState("");
  const [imagem, setImagem] = useState("");

  async function CriarProjeto() {
    try {
      const body = {
        tituloProjeto,
        descricaoProjeto,
        base64: imagem,
      };
      await ApiService.post("/Projeto/CriarProjeto");
      ToastService.Success("Projeto Criado com Sucesso");
      setModalAberto(false);
      await buscarProjeto();
    } catch (error) {
      ToastService.error("Erro Ao Criar um Projeto");
    }
  }

  function handleFileChange(event) {
    const selectedFile = event.target.file[0];
    if (selectedFile) {
      setPrevia(url.createObjectURL(selectedFile));

      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result.split(",")[1];
        setImagem(base64);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagem(null);
      setPrevia(null);
    }
  }

  return (
    <Modal isOpen={modalAberto} style={customStyles}>
      <h2>Cadastre</h2>
      <button
        onClick={() => {
          setModalAberto(false);
        }}
      >
        Fechar
      </button>
      <div>
        <img className={styles.imagem} src={previa} />
      </div>
      <input
        placeholder="Nome Do Projeto"
        value={tituloProjeto}
        onChange={(e) => setTituloProjeto(e.target.value)}
      />
      <input
        placeholder="Descrição"
        type="text"
        value={descricaoProjeto}
        onChange={(e) => setDescricaoProjeto(e.target.value)}
      />

      <input type="file" accept="image/jpeg" onChange={handleFileChange} />
      <button onClick={CriarProjeto}>Criar Projeto</button>
    </Modal>
  );
}
