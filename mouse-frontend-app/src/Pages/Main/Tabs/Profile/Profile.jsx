import { useEffect, useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";
import getCurrentUserInfo, {
  getCurrentUserInfo1,
} from "../../../../Api/User/GetCurrentUserInfo";
import getUserProfile from "../../../../Api/UserProfile/GetUserProfile";
import { useCookies } from "react-cookie";
import checkUserProfile from "../../../../Api/UserProfile/CheckUserProfile";
import UnitOfData from "./Components/UnitOfData";

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

  function onEditProfileClicked() {
    setEditMode(!editMode);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <UnitOfData
            editMode={editMode}
            data={userData && userData.firstName}
            name={"firstName"}
            onChange={handleInputChange}
          ></UnitOfData>

          <div className="user-dob">Дата рождения: </div>
          <UnitOfData
            editMode={editMode}
            data={userData && userData.dateOfBirth}
            name={"dateOfBirth"}
            onChange={handleInputChange}
          ></UnitOfData>

          <div className="physical-data">Физические данные</div>
          <div className="physical-data-item">Рост: </div>
          <UnitOfData
            editMode={editMode}
            data={userData && userData.height}
            name={"height"}
            onChange={handleInputChange}
          ></UnitOfData>

          <div className="physical-data-item">Вес: </div>
          <UnitOfData
            editMode={editMode}
            data={userData && userData.weight}
            name={"weight"}
            onChange={handleInputChange}
          ></UnitOfData>

          <div className="contacts">Контакты</div>
          <div className="contacts-item">Телефон: </div>
          <UnitOfData
            editMode={editMode}
            data={userData && userData.phoneNumber}
            name={"phoneNumber"}
            onChange={handleInputChange}
          ></UnitOfData>

          <div className="contacts-item">Email: </div>
          <UnitOfData
            editMode={editMode}
            data={userData && userData.email}
            name={"email"}
            onChange={handleInputChange}
          ></UnitOfData>
        </div>
        <div className="fill-profile-button">
          <Button
            text={
              !isProfileExists
                ? editMode
                  ? "Сохранить"
                  : "Заполнить профиль"
                : editMode
                ? "Сохранить"
                : "Обновить профиль"
            }
            handler={onEditProfileClicked}
          ></Button>
        </div>
      </div>
    </div>
  );
}
