import PropTypes from "prop-types";
import React from "react";
import "./ChooseDestination.css";

export default function ChooseDestination({ setDestination }) {
  return (
    <div className="ChooseDestination_Buttons_Area">
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          setDestination("Тренер");
        }}
      >
        Отправить тренеру
      </button>
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          setDestination("Админ");
        }}
      >
        Отправить админу сайта
      </button>
    </div>
  );
}

ChooseDestination.propTypes = {
  setDestination: PropTypes.func.isRequired,
};
