import React, { useEffect, useState } from "react";
import styles from "./MenuProjeto.module.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import { ControlledBoard, moveCard } from "@caldwell619/react-kanban";
import "./Kanban.css";
import ApiService from "../../services/ApiService";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import ModalCadastroTarefa from "../../Componets/Modal/ModalCadastroTarefa/ModalCadastroTarefa";
import ModalEditarProjeto from "../../Componets/Modal/ModalEditarProjeto/ModalEditarProjeto";

export default function MenuProjeto() {
  const initialBoard = {
    columns: [
      {
        id: 1,
        title: "A fazer : ",
        cards: [],
      },
      {
        id: 2,
        title: "Fazendo : ",
        cards: [],
      },
      {
        id: 3,
        title: "Feito : ",
        cards: [],
      },
    ],
  };

  const location = useLocation();
  const [board, setBoard] = useState(initialBoard);
  const [projetos, setProjetos] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(location.state.id);
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);
  const [modalProjetoAberto, setModalProjetoAberto] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate("home");
    console
    setProjetoSelecionado({
      value: location.state.id,
      label: location.state.nome,
    });
    BuscarProjetos();
  }, []);

  useEffect(() => {
    BuscarTarefas();
  }, [projetoSelecionado]);

  const handleCardMove = async (_card, source, destination) => {
    setBoard((currentBoard) => {
      return moveCard(currentBoard, source, destination);
    });

    await AtualizarStatusTarefa(_card.id, destination.toColumnId);
  };

  async function AtualizarStatusTarefa(tarefa, status) {
    try {
      await ApiService.put(
        `/tarefa/AtualizarStatusTarefa/${tarefa}/${status - 1}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function BuscarProjetos() {
    try {
      const response = await ApiService.get(`/projeto/listarProjeto`);
      const json = response.data;

      const listaDeProjetos = json
        .map(function (obj) {
          return {
            value: obj.id,
            label: obj.nome,
          };
        })
        .filter(function (obj) {
          return obj !== undefined;
        });

      setProjetos(listaDeProjetos);
    } catch (error) {
      console.log(error);
    }
  }
  async function BuscarTarefas() {
    try {
      if (!projetoSelecionado) return;
      if (!location?.state?.id) return;

      const response = await ApiService.get(
        `/tarefa/projeto/${location.state.id}/tarefas`
      );
      const json = response.data;

      const statusTodo = json
        .map(function (obj) {
          if (obj && obj.status === "0") {
            return {
              id: obj.id,
              title: obj.nome,
            };
          }
        })
        .filter(function (obj) {
          return obj !== undefined;
        });

      const statusDoing = json
        .map(function (obj) {
          if (obj && obj.status === "1") {
            return {
              id: obj.id,
              title: obj.nome,
            };
          }
        })
        .filter(function (obj) {
          return obj !== undefined;
        });

      const statusDone = json
        .map(function (obj) {
          if (!obj || obj.status !== "2") return;

          return {
            id: obj.id,
            title: obj.nome,
          };
        })
        .filter(function (obj) {
          return obj !== undefined;
        });

      const boardAtualizado = {
        columns: [
          {
            id: 1,
            title: "A fazer : ",
            cards: statusTodo,
          },
          {
            id: 2,
            title: "Fazendo : ",
            cards: statusDoing,
          },
          {
            id: 3,
            title: "Feito : ",
            cards: statusDone,
          },
        ],
      };

      setBoard(boardAtualizado);
    } catch (error) {
      console.log(error);
    }
  }

  async function refresh() {
    await BuscarTarefas();
  }

  function handleProjetoSelectChange(projeto) {
    setProjetoSelecionado(projeto)
  }

  return (
    <div className={styles.container}>
      <ModalCadastroTarefa
        modalAberto={modalTarefaAberto}
        setModalAberto={setModalTarefaAberto}
        refresh={refresh}
        projetoClicado={projetoSelecionado?.value}
      />
      <ModalEditarProjeto
        modalAberto={modalProjetoAberto}
        setModalAberto={setModalProjetoAberto}
        refresh={refresh}
        idProjetoSelecionado={projetoSelecionado?.value}
      />
      <Sidebar />
      <div className={styles.appContainer}>
        <div className={styles.header}>
          <Select
            options={projetos}
            value={projetoSelecionado}
            className={styles.select}
            placeholder="Projetos..."
            onChange={handleProjetoSelectChange}
          ></Select>
          <button
            className={styles.btn}
            onClick={() => setModalProjetoAberto(true)}
          >
            Editar Projeto
          </button>
          <button
            className={styles.btn}
            onClick={() => setModalTarefaAberto(true)}
          >
            Criar Tarefa
          </button>
        </div>
        <div className={styles.pages}>
          <ControlledBoard
            onCardDragEnd={handleCardMove}
            allowAddCard={false}
            allowRemoveCard={false}
            allowAddColumn={false}
            allowRenameColumn={false}
            allowRemoveColumn={false}
            disableColumnDrag={true}
          >
            {board}
          </ControlledBoard>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
