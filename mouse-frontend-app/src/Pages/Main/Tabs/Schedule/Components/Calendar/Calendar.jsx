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
import { getAllTrainings } from "../../../../../../Api/Trainings/GetAllTrainings";

export default function Calendar({ today, setToday, handleTrainingDayClick }) {
  const weekOptions = { locale: ru, weekStartsOn: 1 };

  const [days, setDays] = useState(
    eachDayOfInterval({
      start: startOfWeek(startOfMonth(today), weekOptions),
      end: endOfWeek(endOfMonth(today), weekOptions),
    })
  );
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(today, weekOptions),
    end: endOfWeek(today, weekOptions),
  });
  const [allTrainings, setAllTrainings] = useState({});

  useEffect(() => {
    setDays(
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(today), weekOptions),
        end: endOfWeek(endOfMonth(today), weekOptions),
      })
    );
  }, [today]);

  useEffect(() => {
    getAllTrainings()
      .then((result) => {
        setAllTrainings(result);
        setToday(startOfToday());

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <MonthInfo today={today} locale={ru}></MonthInfo>

      <MonthScroll today={today} setToday={setToday}></MonthScroll>
      <CalendarDays
        days={days}
        daysOfWeek={daysOfWeek}
        locale={ru}
        today={today}
        allTrainings={allTrainings}
        handleTrainingDayClick={handleTrainingDayClick}
      ></CalendarDays>
    </>
  );
}
