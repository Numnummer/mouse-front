import { format, isSameDay, isSameMonth, startOfToday } from "date-fns";
import "./CalendarDays.css";
import { useEffect, useState } from "react";
import { getAllTrainings } from "../../../../../../Api/Trainings/GetAllTrainings";

export default function ({
  days,
  daysOfWeek,
  locale,
  today,
  allTrainings,
  handleTrainingDayClick,
  fetchTrainings,
}) {
  const weeks = [];
  const isTrainingDay = (day) => {
    return allTrainings.items?.some((training) => {
      const trainingDate = new Date(training.trainingDate);
      return isSameDay(day, trainingDate);
    });
  };
  const getTrainingByDay = (day) => {
    return allTrainings.items.find((training) => {
      const trainingDate = new Date(training.trainingDate);
      return isSameDay(day, trainingDate);
    });
  };
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }
  const [a, setA] = useState(false);
  useEffect(() => {
    console.log(allTrainings);
    //fetchTrainings();
    setA(!a);
  }, [allTrainings]);

  return (
    <div className="calendar">
      <div className="day-of-the-weeks">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-of-the-week">
            {format(day, "EEEEEE", {
              locale: locale,
            })}
          </div>
        ))}
      </div>
      {weeks.map((week, weekIndex) => (
        /*Здесь стили для строчек недель*/
        <div className="dayButtons" key={weekIndex}>
          {week.map((day, dayIndex) => (
            /*Здесь стили для дней */
            <div key={dayIndex}>
              <button
                className={
                  isSameMonth(today, day)
                    ? isTrainingDay(day)
                      ? "training-day"
                      : "day"
                    : "disabled-day"
                }
                onClick={
                  isTrainingDay(day)
                    ? () => handleTrainingDayClick(day, getTrainingByDay(day))
                    : null
                }
              >
                {format(day, "d")}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
