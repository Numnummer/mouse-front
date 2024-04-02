import { format } from "date-fns";
import "./CalendarDays.css";

export default function ({ days }) {
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }

  return (
    <div className="calendar">
      <div className="month-info">
        {/* месяц с бэка придет? */}
        <label className="month">Апрель 2023</label>
      </div>
      <hr></hr>
      <div className="day-of-the-weeks">
        <div className="day-of-the-week">Пн</div>
        <div className="day-of-the-week">Вт</div>
        <div className="day-of-the-week">Ср</div>
        <div className="day-of-the-week">Чт</div>
        <div className="day-of-the-week">Пт</div>
        <div className="day-of-the-week">Сб</div>
        <div className="day-of-the-week">Вс</div>
      </div>
      {weeks.map((week, weekIndex) => (
        /*Здесь стили для строчек недель*/
        <div className="dayButtons" key={weekIndex}>
          {week.map((day, dayIndex) => (
            /*Здесь стили для дней*/
            <div key={dayIndex}>
              <button className="day">{format(day, "d")}</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
