import React, { useState } from "react";
import Home from "./Home";

export default function ListaDeTarefas() {
  const [projeto, setProjeto] = useState({
    tituloTarefa: "Banco de Dados",
    descricaoTarefa: "AAAAAAAAAAAAAA",
    tituloProjeto: "TaskSync",
    descricaoProjeto: "Descrição do projeto TaskSync",
  });

  return (
    <div className="container">
      <Home
        tituloProjeto={projeto.tituloProjeto}
        descricaoProjeto={projeto.descricaoProjeto}
        tituloTarefa={projeto.tituloTarefa}
        descricaoTarefa={projeto.descricaoTarefa}
      />
    </div>
  );
}
