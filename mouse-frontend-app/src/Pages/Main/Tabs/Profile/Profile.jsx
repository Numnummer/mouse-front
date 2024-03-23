import { useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";

export default function Profile({ isProfileExists }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="user-page-container">
      <div className="user-info">
        <div className="personal-data">
          <div className="personal-data-title">Персональные данные</div>
          <div className="user-photo"></div>
          <button>Изменить</button>
          <div className="user-name">Имя: </div>
          {editMode ? <input></input> : <div>Имя пользователя</div>}
          <div className="user-dob">Дата рождения: </div>
          {editMode ? <input></input> : <div>Дата рождения</div>}
          <div className="physical-data">Физические данные</div>
          <div className="physical-data-item">Рост: </div>
          {editMode ? <input></input> : <div>Рост пользователя</div>}
          <div className="physical-data-item">Вес: </div>
          {editMode ? <input></input> : <div>Вес пользователя</div>}
          <div className="contacts">Контакты</div>
          <div className="contacts-item">Телефон: </div>
          {editMode ? <input></input> : <div>Номер телефона</div>}
          <div className="contacts-item">Email: </div>
          {editMode ? <input></input> : <div>email@example.com</div>}
        </div>
        <div className="fill-profile-button">
          <Button
            text={
              !isProfileExists
                ? "Заполнить профиль"
                : editMode
                ? "Сохранить"
                : "Обновить профиль"
            }
          ></Button>
        </div>
      </div>
    </div>
  );
}
