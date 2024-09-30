import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";
import CalendarDays from "./CalendarDays";
import { useState } from "react";
import { useEffect } from "react";
import MonthInfo from "./MonthInfo";
import MonthScroll from "./MonthScroll";
import React from "react";
import PropTypes from "prop-types";

export default function Calendar({
  today,
  setToday,
  handleTrainingDayClick,
  allTrainings,
  fetchTrainings,
  switcher,
}) {
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

  const [a, setA] = useState(false);
  useEffect(() => {
    console.log("asd");
    fetchTrainings();
    setA(!a);
  }, [switcher]);

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
        today={today}
        allTrainings={allTrainings}
        handleTrainingDayClick={handleTrainingDayClick}
        fetchTrainings={fetchTrainings}
      ></CalendarDays>
    </>
  );
}

Calendar.propTypes = {
  today: PropTypes.object.isRequired,
  setToday: PropTypes.func.isRequired,
  handleTrainingDayClick: PropTypes.func.isRequired,
  switcher: PropTypes.bool.isRequired,
  allTrainings: PropTypes.object.isRequired,
  fetchTrainings: PropTypes.func.isRequired,
};
