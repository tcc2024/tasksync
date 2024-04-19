import Home from "./Home";
import React, {useState} from "react";


export default function ListaDeProjetos() {
  const [projeto, setProjeto] = useState({
    tituloProjeto: "TaskSync",
    descricaoProjeto: "AAAAAAAAAAAAAA",
  });
  return (
    <div>
      <Home projeto={projeto} />
    </div>
  );
}
