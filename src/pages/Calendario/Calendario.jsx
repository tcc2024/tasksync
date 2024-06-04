import { useCalendarApp, ScheduleXCalendar, } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import ModalCadastroEvento from "../../Componets/Modal/ModalCalendarioEventos";
import "@schedule-x/theme-default/dist/index.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { ToastContainer } from "react-toastify";
import styles from "./Calendario.module.css";
import { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";

function Calendario() {
  const [modalAberto, setModalAberto] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [eventos, setEventos] = useState([]);
  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    events: eventos,
    callbacks: {
      onClickDate(date) {
        onClickCalendar(date);
      },
    },
  });

  async function BuscarDadosEventosPorUsuario() {
    const response = await ApiService.get("/Eventos/listarEvento");
    if (response.status == 200) {


      response.data.forEach(evento => {
        const eventoExiste = calendar.events.get(evento.id);
        if (!eventoExiste) {

          calendar.events.add({
            id: evento.id,
            title: evento.nome,
            description: evento.descricao,
            // people: evento.usuariosAtribuidos,
            start: '2024-05-28',
            end: '2024-05-28',
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
    setModalAberto(true);
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.pages}>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
        {modalAberto && (
          <ModalCadastroEvento
            modalAberto={modalAberto}
            setModalAberto={setModalAberto}
            dataHora={dataSelecionada}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Calendario;
