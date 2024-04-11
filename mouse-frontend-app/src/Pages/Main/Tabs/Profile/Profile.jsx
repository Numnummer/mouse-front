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
import image from "./profile-image.png"

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
      response.dateOfBirth = parseToNormalDate(response.dateOfBirth);
      setUserData(response);
      localStorage.setItem(userNameItem, response.firstName);
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

  function parseToNormalDate(dateString) {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return dateObj.toLocaleDateString("en-GB", options);
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
        <div className="user-photo">
          <img className="user-photo" src={image} width='250px'></img>
        </div>
        {/* <div className="change-button">
          <Button text="Изменить"></Button>
        </div> */}
      </div>
      <div className="info">
        <div className="info1">
          <label className="physical-data">Персональные данные</label>
          <div className="user-dob">Имя:
          <UnitOfData
              editMode={editMode}
              type={"text"}
              data={`${userData.firstName} ${userData.lastName}`}
              name={"firstName"}
              onChange={handleInputChange}>
          </UnitOfData>
          </div>
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
          <div className="user-dob"> {/* сделать чекбоксом  */}
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
          <div className="user-dob">Email:
            <UnitOfData
                editMode={editMode}
                type={"text"}
                data={userData.email}
                name={"email"}
                onChange={handleInputChange}>
            </UnitOfData></div>
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
