import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  viewWeek,
  viewDay,
  viewMonthGrid,
  viewMonthAgenda,
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
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
  });

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default Calendario;
