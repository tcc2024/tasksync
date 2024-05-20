import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import Sidebar from "../../Componets/Sidebar/Sidebar";
import Header from "../../Componets/Header/Header";
import { ToastContainer } from "react-toastify";
import styles from "./Calendario.module.css";

function Calendario() {
  const calendar = useCalendarApp({
    defaultView: viewMonthGrid.name,
    views: [viewDay, viewWeek, viewMonthGrid, viewMonthAgenda],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
    ],
    callbacks: {
      onClickDate(date) {
        onClickCalendar(date);
      },
    },
  });

  function onClickCalendar(date) {
    //Abrir Modal aqui
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.appContainer}>
        <Header />
        <div className={styles.pages}>
          <ScheduleXCalendar calendarApp={calendar} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Calendario;
