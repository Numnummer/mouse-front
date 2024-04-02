import { format } from "date-fns";

export default function ({ today, locale }) {
  return (
    <div className="month-info">
      <label className="month">
        {format(today, "LLLL yyyy", { locale: locale })}
      </label>
    </div>
  );
}
