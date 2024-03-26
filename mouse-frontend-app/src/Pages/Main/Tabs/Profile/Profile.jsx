import { useEffect, useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";
import getCurrentUserInfo from "../../../../Api/User/GetCurrentUserInfo";
import getUserProfile from "../../../../Api/UserProfile/GetUserProfile";
import { useCookies } from "react-cookie";
import checkUserProfile from "../../../../Api/UserProfile/CheckUserProfile";
import UnitOfData from "./Components/UnitOfData";
import { authToken } from "../../../../Constants/LocalStorageItemKeys";
import createProfile from "../../../../Api/UserProfile/CreateProfile";
import updateProfile from "../../../../Api/UserProfile/UpdateProfile";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });
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
          <label>{userData.firstName}</label>
          <div className="user-dob">
            Дата рождения:
            <UnitOfData
              editMode={editMode}
              type={"date"}
              data={userData.dateOfBirth}
              name={"dateOfBirth"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>

          <div className="user-dob">
            Пол:
            <UnitOfData
              editMode={editMode}
              type={"number"}
              data={userData.gender}
              name={"gender"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
        </div>
        <div className="info2">
          <div className="physical-data">Физические данные</div>
          <div className="physical-data-item">
            Рост:
            <UnitOfData
              editMode={editMode}
              type={"number"}
              data={userData.height}
              name={"height"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>

          <div className="physical-data-item">
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
          <div className="contacts-item">
            Телефон:
            <UnitOfData
              editMode={editMode}
              type={"tel"}
              data={userData.phoneNumber}
              name={"phoneNumber"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
          <div className="contacts-item">Email: </div>
          <label>{userData.email}</label>
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
