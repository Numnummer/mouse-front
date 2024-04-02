import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import CalendarDays from "./CalendarDays";
import { useState } from "react";
import { useEffect } from "react";
import MonthInfo from "./MonthInfo";
import MonthScroll from "./MonthScroll";

export default function Calendar() {
  const weekOptions = { locale: ru, weekStartsOn: 1 };
  const [today, setToday] = useState(startOfToday());
  const [days, setDays] = useState({
    start: startOfMonth(today),
    end: endOfWeek(endOfMonth(today)),
  });
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(today, weekOptions),
    end: endOfWeek(today, weekOptions),
  });

  useEffect(() => {
    setDays(
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(today), weekOptions),
        end: endOfWeek(endOfMonth(today), weekOptions),
      })
    );
  }, [today]);

  return (
    <>
      <MonthInfo today={today} locale={ru}></MonthInfo>

      <MonthScroll today={today} setToday={setToday}></MonthScroll>
      <CalendarDays
        days={days}
        daysOfWeek={daysOfWeek}
        locale={ru}
      ></CalendarDays>
    </>
  );
}
