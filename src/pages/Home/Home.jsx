import React, { useState } from "react";
import ListaDeProjetos from "../../Componets/ListaDeProjetos/ListaDeProjetos";

export default function Home() {
  const [projetos, setProjetos] = useState([
    {
      tituloTarefa: "Banco de Dados",
      descricaoTarefa: "AAAAAAAAAAAAAA",
      tituloProjeto: "TaskSync",
      descricaoProjeto: "TaskSync",
    },
  ]);
  return (
    <div>
      <ListaDeProjetos projetos={projetos} />
    </div>
  );
}
