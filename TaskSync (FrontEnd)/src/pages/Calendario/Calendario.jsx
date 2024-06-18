import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import ModalCadastroEvento from "../../Componets/Modal/CadastroCadastroEvento/ModalCalendarioEventos";
import ModalEditarEvento from "../../Componets/Modal/ModalEditarEvento/ModalEditarEventos";
import "@schedule-x/theme-default/dist/index.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import Header from '../../Componets/Header/HeaderHome/Header'
import styles from "./Calendario.module.css";
import { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

function Calendario() {
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    events: eventos,
    callbacks: {
      onClickDate(date) {
        onClickCalendar(date);
      },
      onEventClick(calendarEvent) {
        onClickEvent(calendarEvent.id);
      },
    },
  });


  async function refresh() {
    await BuscarDadosEventosPorUsuario();
  }

  async function BuscarDadosEventosPorUsuario() {
    const response = await ApiService.get("/Eventos/listarEvento");
    if (response.status == 200) {
      response.data.forEach((evento) => {
        const eventoExiste = calendar.events.get(evento.id);
        if (!eventoExiste) {
          console.log(evento);
          calendar.events.add({
            id: evento.id,
            title: evento.nome,
            description: evento.descricao,
            // people: evento.usuariosAtribuidos,
            start: evento.dataHora,
            end: evento.dataHora,
          });
        }
      });
    }
  }

  useEffect(() => {
    BuscarDadosEventosPorUsuario();
  }, []);

  function onClickCalendar(date) {
    console.log(date);
    setDataSelecionada(date);
    setModalCadastroAberto(true);
  }

  function onClickEvent(id) {
    console.log(id);
    setIdSelecionado(id);
    setModalEditarAberto(true);
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.pages}>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
        {modalCadastroAberto && (
          <ModalCadastroEvento
            modalCadastroAberto={modalCadastroAberto}
            setModalCadastroAberto={setModalCadastroAberto}
            dataHora={dataSelecionada}
            refresh={refresh}
          />
        )}
        {modalEditarAberto && (
          <ModalEditarEvento
            modalEditarAberto={modalEditarAberto}
            setModalEditarAberto={setModalEditarAberto}
            idEventoSelecionado={idSelecionado}
            refresh={refresh}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Calendario;
