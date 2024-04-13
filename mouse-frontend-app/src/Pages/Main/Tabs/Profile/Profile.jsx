import { useEffect, useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";
import getCurrentUserInfo from "../../../../Api/User/GetCurrentUserInfo";
import getUserProfile from "../../../../Api/UserProfile/GetUserProfile";
import { useCookies } from "react-cookie";
import checkUserProfile from "../../../../Api/UserProfile/CheckUserProfile";
import UnitOfData from "./Components/UnitOfData";
import {
  authToken,
  userNameItem,
} from "../../../../Constants/LocalStorageItemKeys";
import createProfile from "../../../../Api/UserProfile/CreateProfile";
import updateProfile from "../../../../Api/UserProfile/UpdateProfile";
import image from "./profile-image.png";
import { DatePicker } from "antd";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export default function Profile({
  userData,
  setUserData,
  isProfileExists,
  setIsProfileExists,
}) {
  const [editMode, setEditMode] = useState(false);

  function onEditProfileClicked(event) {
    setEditMode(!editMode);
    if (editMode) {
      updateProfile(userData);
    }
  }

  function onCreateProfile() {
    setEditMode(!editMode);
    if (editMode) {
      createProfile(userData).then(() => {
        setIsProfileExists(true);
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onBirthDateChanged = (date, dateString) => {
    setUserData((prev) => ({ ...prev, dateOfBirth: dateString }));
  };

  return (
    <div className="user-page-container">
      <div className="personal-data-title">
        <div className="user-photo">
          <img className="user-photo" src={image} width="250px"></img>
        </div>
        {/* <div className="change-button">
          <Button text="Изменить"></Button>
        </div> */}
      </div>
      <div className="info">
        <div className="info1">
          <label className="physical-data">Персональные данные</label>
          <div className="user-dob">
            Имя:
            <div className="editModeData">{`${userData.firstName} ${userData.lastName}`}</div>
          </div>
          <div className="user-dob">
            Дата рождения:
            {editMode ? (
              <DatePicker
                className="date-picker"
                onChange={onBirthDateChanged}
                needConfirm
              />
            ) : (
              <div className="editModeData">
                {userData.dateOfBirth &&
                  format(userData.dateOfBirth, "d MMMM yyyy", { locale: ru })}
              </div>
            )}
          </div>
          <div className="user-dob">
            {" "}
            Пол:
            {editMode ? (
              <div>
                <select
                  name={"gender"}
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option>Мужчина</option>
                  <option>Женщина</option>
                </select>
              </div>
            ) : (
              <div className="editModeData">{userData.gender}</div>
            )}
          </div>
        </div>
        <div className="info2">
          <div className="physical-data">Физические данные</div>
          <div className="user-dob">
            Рост:
            <UnitOfData
              editMode={editMode}
              type={"number"}
              data={userData.height}
              name={"height"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>

          <div className="user-dob">
            Вес:
            <UnitOfData
              editMode={editMode}
              type={"number"}
              data={userData.weight}
              name={"weight"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
        </div>
        <div className="info3">
          <div className="contacts">Контакты</div>
          <div className="user-dob">
            Телефон:
            <UnitOfData
              editMode={editMode}
              type={"tel"}
              data={userData.phoneNumber}
              name={"phoneNumber"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
          <div className="user-dob">
            Email:
            <UnitOfData
              editMode={editMode}
              type={"text"}
              data={userData.email}
              name={"email"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
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
          handler={isProfileExists ? onEditProfileClicked : onCreateProfile}
        ></Button>
      </div>
    </div>
  );
}
