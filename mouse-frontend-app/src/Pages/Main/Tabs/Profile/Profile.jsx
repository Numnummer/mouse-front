import { useState } from "react";
import Button from "../../../StartPage/Components/Button/Button";
import "./Profile.css";
import UnitOfData from "./Components/UnitOfData";
import createProfile from "../../../../Api/UserProfile/CreateProfile";
import updateProfile from "../../../../Api/UserProfile/UpdateProfile.js";
import { DatePicker } from "antd";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import PropTypes from "prop-types";

export default function Profile({
  userData,
  setUserData,
  isProfileExists,
  setIsProfileExists,
}) {
  const [editMode, setEditMode] = useState(false);
  const image = "./profile-image.png";

  function onEditProfileClicked() {
    setEditMode(!editMode);
    if (editMode) {
      updateProfile(userData);
    }
  }

  function onCreateProfile() {
    setEditMode(!editMode);
    if (editMode) {
      createProfile(userData)
        .then(() => {
          setIsProfileExists(true);
        })
        .catch(() => {
          toast.error("Не удалось создать профиль");
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
      <ToastContainer></ToastContainer>
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
            <UnitOfData
              editMode={editMode}
              type={"text"}
              data={userData.firstName}
              name={"firstName"}
              onChange={handleInputChange}
            ></UnitOfData>
          </div>
          <div className="user-dob">
            Фамилия:
            <UnitOfData
              editMode={editMode}
              type={"text"}
              data={userData.lastName}
              name={"lastName"}
              onChange={handleInputChange}
            ></UnitOfData>
            {/*<div className="editModeData">{`${userData.firstName} ${userData.lastName}`}</div>*/}
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
                  className="select-container"
                >
                  <option className="option-text">Мужчина</option>
                  <option className="option-text">Женщина</option>
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

Profile.propTypes = {
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
  isProfileExists: PropTypes.bool.isRequired,
  setIsProfileExists: PropTypes.func.isRequired,
};
