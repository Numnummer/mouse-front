import { format } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

export default function MonthInfo({ today, locale }) {
  return (
    <div className="month-info">
      <label className="month">
        {format(today, "LLLL yyyy", { locale: locale })}
      </label>
    </div>
  );
}

MonthInfo.propTypes = {
  today: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};
