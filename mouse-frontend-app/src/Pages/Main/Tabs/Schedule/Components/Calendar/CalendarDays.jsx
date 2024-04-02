import { format, isSameMonth, startOfToday } from "date-fns";
import "./CalendarDays.css";

export default function ({ days, daysOfWeek, locale, today }) {
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }

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
            /*Здесь стили для дней
            isSameMonth(startOfToday(),day)*/
            <div key={dayIndex}>
              <button
                className={isSameMonth(today, day) ? "day" : "disabled-day"}
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
