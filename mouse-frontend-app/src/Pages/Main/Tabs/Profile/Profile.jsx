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
import { authToken } from "../../../../Constants/LocalStorageItemKeys";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [isProfileExists, setIsProfileExists] = useState(false);

  useEffect(() => {
    getCurrentUserInfo().then((response) => {
      setUserData(response);
      if (response) {
        checkUserProfile().then((result) => {
          setIsProfileExists(result);
        });
      }
    });
  }, []);

  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  function onEditProfileClicked() {
    setEditMode(!editMode);
  }

  function createProfile() {
    setEditMode(!editMode);
    console.log(userData);
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
      <div className="personal-data-title">
        <label className="persData">Персональные данные</label>
        <div className="user-photo">
          <div className="change-button">
            <Button text="Изменить"></Button>
          </div>
        </div>
      </div>
      <div className="info">
        <div className="info1">
          <div className="user-name">Имя: </div>
          <label>{userData && userData.firstName}</label>
          <div className="user-dob">Дата рождения: 
            <UnitOfData
              editMode={editMode}
              data={userData && userData.dateOfBirth}
              name={"dateOfBirth"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
        </div>
          <div className="info2">
            <div className="physical-data">Физические данные</div>
            <div className="physical-data-item">Рост: 
              <UnitOfData
                editMode={editMode}
                data={userData && userData.height}
                name={"height"}
                onChange={handleInputChange}
              ></UnitOfData>
            </div>

            <div className="physical-data-item">Вес: 
              <UnitOfData
                editMode={editMode}
                data={userData && userData.weight}
                name={"weight"}
                onChange={handleInputChange}
              ></UnitOfData>
            </div>
          </div>
          <div className="info3">
            <div className="contacts">Контакты</div>
            <div className="contacts-item">Телефон:
              <UnitOfData
                editMode={editMode}
                data={userData && userData.phoneNumber}
                name={"phoneNumber"}
                onChange={handleInputChange}
              ></UnitOfData>
              </div>
            <div className="contacts-item">Email: </div>
            <label>{userData && userData.email}</label>
          </div>
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
            handler={isProfileExists ? onEditProfileClicked : createProfile}
          ></Button>
        </div>
    </div>
  );
}
