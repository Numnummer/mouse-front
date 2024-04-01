import { format } from "date-fns";
import './CalendarDays.css'

export default function ({ days }) {
  const weeks = [];
  while (days.length > 0) {
    weeks.push(days.splice(0, 7));
  }

  return (
    <div>
      {weeks.map((week, weekIndex) => (
        /*Здесь стили для строчек недель*/
        <div className="dayButtons" key={weekIndex}>
          {week.map((day, dayIndex) => (
            /*Здесь стили для дней*/
            <div key={dayIndex}>
              <button>{format(day, "d")}</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
