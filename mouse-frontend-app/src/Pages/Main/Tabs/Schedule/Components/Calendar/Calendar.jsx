import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ru } from "date-fns/locale";
import CalendarDays from "./CalendarDays";

export default function Calendar() {
  let today = startOfToday();
  let days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <>
      <CalendarDays days={days}></CalendarDays>
    </>
  );
}