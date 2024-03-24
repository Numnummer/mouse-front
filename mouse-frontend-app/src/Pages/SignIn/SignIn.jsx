import styles from "../Register/Register.module.css";
import { useState } from "react";
import {
  processSignIn,
  processSignInByOtherService,
} from "./Services/SignInService.js";
import CommonStyles from "../../CommonStyles/CommonStyles.module.css";
import VkIcon from "../../Icons.jsx/VkIcon.jsx";
import GoogleIcon from "../../Icons.jsx/GoogleIcon.jsx";
import YandexIcon from "../../Icons.jsx/YandexIcon.jsx";
import style from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function onFormSubmit(event) {
    event.preventDefault();
    processSignIn(signInData).then(() => {
      navigate("Main");
    });
  }
  function onOtherServiceSubmit(event, service) {
    event.preventDefault();
    processSignInByOtherService(service);
  }

  return (
    <div className={styles.page}>
      <h1 className={CommonStyles.title1}>Трекер Тренировок</h1>
      <div className={style.mainPanel}>
        <form>
          <div className={CommonStyles.inputs}>
            <input
              placeholder={"Email"}
              onChange={(event) => {
                setSignInData({ ...signInData, email: event.target.value });
              }}
            />
            <input
              placeholder={"Пароль"}
              onChange={(event) => {
                setSignInData({ ...signInData, password: event.target.value });
              }}
            />
          </div>
        </form>
        <div className={style.icons}>
          <button onClick={(event) => onOtherServiceSubmit(event, "Vk")}>
            <VkIcon />
          </button>
          <button onClick={(event) => onOtherServiceSubmit(event, "Google")}>
            <GoogleIcon />
          </button>
          <button onClick={(event) => onOtherServiceSubmit(event, "Yandex")}>
            <YandexIcon />
          </button>
        </div>
        <div className={styles.registerButton}>
          <input
            type={"submit"}
            className={styles.register}
            value={"Войти"}
            onClick={onFormSubmit}
          />
        </div>
      </div>
    </div>
  );
}
