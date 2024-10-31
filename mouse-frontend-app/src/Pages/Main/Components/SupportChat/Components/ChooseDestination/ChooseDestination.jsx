import PropTypes from "prop-types";
import React from "react";
import "./ChooseDestination.css";

export default function ChooseDestination({
  setDestination,
  setGroupDestination,
  role,
}) {
  return (
    <div className="ChooseDestination_Buttons_Area">
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          if (!role) return;
          let destination =
            role === "User"
              ? "Тренер"
              : role === "Coach"
                ? "Пользователь"
                : "Тренер";
          setDestination(destination);
          setGroupDestination(destination);
        }}
      >
        {role === "User"
          ? "Отправить тренеру"
          : role === "Coach"
            ? "Отправить пользователю"
            : role === "Administrator"
              ? "Отправить тренеру"
              : "Загрузка"}
      </button>
      <button
        className="ChooseDestination_Button"
        onClick={() => {
          if (!role) return;
          let destination =
            role === "User"
              ? "Админ"
              : role === "Coach"
                ? "Админ"
                : "Пользователь";
          setDestination(destination);
          setGroupDestination(destination);
        }}
      >
        {role === "User"
          ? "Отправить админу сайта"
          : role === "Coach"
            ? "Отправить админу сайта"
            : role === "Administrator"
              ? "Отправить пользователю"
              : "Загрузка"}
      </button>
    </div>
  );
}

ChooseDestination.propTypes = {
  setDestination: PropTypes.func.isRequired,
  setGroupDestination: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
