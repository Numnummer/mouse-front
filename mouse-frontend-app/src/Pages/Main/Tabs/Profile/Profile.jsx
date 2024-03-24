import { useEffect, useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";
import getCurrentUserInfo, {
  getCurrentUserInfo1,
} from "../../../../Api/User/GetCurrentUserInfo";
import getUserProfile from "../../../../Api/UserProfile/GetUserProfile";
import { useCookies } from "react-cookie";
import checkUserProfile from "../../../../Api/UserProfile/CheckUserProfile";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [isProfileExists, setIsProfileExists] = useState(false);
  useEffect(() => {
    getCurrentUserInfo().then((response) => {
      setUserData(response);
      if (response) {
        checkUserProfile(response.userId).then((result) => {
          setIsProfileExists(result);
        });
      }
    });
  }, []);

  return (
    <div className="user-page-container">
      <div className="user-info">
        <div className="personal-data">
          <div className="personal-data-title">Персональные данные</div>
          <div className="user-photo"></div>
          <div className="change-button">
            <Button text="Изменить"></Button>
          </div>
          <div className="user-name">Имя: </div>
          {editMode ? (
            <input></input>
          ) : (
            <div>{userData && userData.firstName}</div>
          )}
          <div className="user-dob">Дата рождения: </div>
          {editMode ? (
            <input></input>
          ) : (
            <div>{userData && userData.dateOfBirth}</div>
          )}
          <div className="physical-data">Физические данные</div>
          <div className="physical-data-item">Рост: </div>
          {editMode ? (
            <input></input>
          ) : (
            <div>{userData && userData.height}</div>
          )}
          <div className="physical-data-item">Вес: </div>
          {editMode ? (
            <input></input>
          ) : (
            <div>{userData && userData.weight}</div>
          )}
          <div className="contacts">Контакты</div>
          <div className="contacts-item">Телефон: </div>
          {editMode ? (
            <input></input>
          ) : (
            <div>{userData && userData.phoneNumber}</div>
          )}
          <div className="contacts-item">Email: </div>
          {editMode ? <input></input> : <div>{userData && userData.email}</div>}
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
