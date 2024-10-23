import styles from "./Register.module.css";
import { useState } from "react";
import processRegistration from "./Services/RegistrationService.js";
import CommonStyles from "../../CommonStyles/CommonStyles.module.css";
import { useNavigate } from "react-router-dom";
import VisabilityOffIcon from "../../Icons.jsx/VisabilityOffIcon,.jsx";
import VisabilityOnIcon from "../../Icons.jsx/VisabilityOnIcon.jsx";
import "./Registration228.css";
import Pictures from "../StartPage/Pictures.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { coachRole, standartRole } from "./Constants/UserRoles.js";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    role: standartRole,
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  function onRegistrationSubmit(event) {
    event.preventDefault();
    processRegistration(registrationData)
      .then((result) => {
        result && navigate("Main");
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
      ></ToastContainer>
      <Pictures />
      <div className={styles.page}>
        <div className={styles.mainPanel}>
          <form onSubmit={onRegistrationSubmit}>
            <h1 className={CommonStyles.title1} style={{}}>
              Трекер Тренировок
            </h1>
            <div className={CommonStyles.inputs}>
              <input
                name="userName"
                placeholder={"Никнейм"}
                value={registrationData.userName}
                onChange={handleInputChange}
              />
              <input
                name="firstName"
                placeholder={"Имя"}
                value={registrationData.firstName}
                onChange={handleInputChange}
              />
              <input
                name="lastName"
                placeholder={"Фамилия"}
                value={registrationData.lastName}
                onChange={handleInputChange}
              />
              <input
                name="email"
                placeholder={"Email"}
                value={registrationData.email}
                onChange={handleInputChange}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={"Пароль"}
                value={registrationData.password}
                onChange={handleInputChange}
              />
              <div>
                <button
                  className={styles.showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisabilityOnIcon /> : <VisabilityOffIcon />}
                  <span></span>
                </button>
              </div>
            </div>
            <div className={styles.coachTitle}>
              <input
                className={styles.checkboxCoach}
                type="checkbox"
                onChange={(e) => {
                  let role = standartRole;
                  if (e.target.checked) role = coachRole;
                  setRegistrationData({ ...registrationData, Role: role });
                }}
              />
              <label>Я тренер</label>
              <label id="registration228"></label>
            </div>
            <div className={styles.registerButton}>
              <input
                className={styles.register}
                type="submit"
                value={"Зарегистрироваться"}
                onClick={onRegistrationSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
