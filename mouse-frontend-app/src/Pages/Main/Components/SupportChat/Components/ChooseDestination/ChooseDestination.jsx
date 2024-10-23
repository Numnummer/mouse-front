import PropTypes from "prop-types";
import React from "react";
import "./ChooseDestination.css";

export default function ChooseDestination({ setDestination, role }) {
  return (
    <div className="ChooseDestination_Buttons_Area">
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          let destination =
            role == "User"
              ? "Тренер"
              : role == "Coach"
              ? "Пользователь"
              : "Тренер";
          setDestination(destination);
        }}
      >
        {role == "User"
          ? "Отправить тренеру"
          : role == "Coach"
          ? "Отправить пользователю"
          : "Отправить тренеру"}
      </button>
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          let destination =
            role == "User"
              ? "Админ"
              : role == "Coach"
              ? "Админ"
              : "Пользователь";
          setDestination(destination);
        }}
      >
        {role == "User"
          ? "Отправить админу сайта"
          : role == "Coach"
          ? "Отправить админу сайта"
          : "Отправить пользователю"}
      </button>
    </div>
  );
}

ChooseDestination.propTypes = {
  setDestination: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
