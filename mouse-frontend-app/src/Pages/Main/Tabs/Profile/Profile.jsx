import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="user-page-container">
      <div className="user-info">
        <div className="personal-data">
          <div className="personal-data-title">Персональные данные</div>
          <div className="user-photo"></div>
          <button>Изменить профиль</button>
          <div className="user-name">Имя: Имя пользователя</div>
          <div className="user-dob">Дата рождения: Дата рождения</div>
          <div className="physical-data">Физические данные</div>
          <div className="physical-data-item">Рост: Рост пользователя</div>
          <div className="physical-data-item">Вес: Вес пользователя</div>
          <div className="contacts">Контакты</div>
          <div className="contacts-item">Телефон: Номер телефона</div>
          <div className="contacts-item">Email: email@example.com</div>
        </div>
        <div className="fill-profile-button">
          <Button text="Заполнить профиль"></Button>
        </div>
      </div>
    </div>
  );
}
