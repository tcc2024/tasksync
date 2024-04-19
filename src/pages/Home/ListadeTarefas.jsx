import Home from "./Home";
import React, { useState } from "react";

export default function ListaDeTarefas() {
  const [projeto, setProjeto] = useState({
    tituloTarefa: "TaskSync",
    descricaoTarefa: "AAAAAAAAAAAAAA",
    tituloProjeto: "TaskSync",
  });
  return (
    <div>
      <Home projeto={projeto} />
    </div>
  );
}
