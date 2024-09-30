import { addMonths, subMonths } from "date-fns";
import "./MonthScroll.css";
import React from "react";
import PropTypes from "prop-types";

export default function MonthScroll({ today, setToday }) {
  return (
    <div className="scrolls">
      <button
        className="month-scroll"
        onClick={() => {
          setToday(subMonths(today, 1));
        }}
      >
        {"<"}
      </button>
      <button
        className="month-scroll"
        onClick={() => {
          setToday(addMonths(today, 1));
        }}
      >
        {">"}
      </button>
    </div>
  );
}

MonthScroll.propTypes = {
  today: PropTypes.object.isRequired,
  setToday: PropTypes.func.isRequired,
};
