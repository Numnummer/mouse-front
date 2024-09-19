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
import { Link, useNavigate } from "react-router-dom";
import VisabilityOnIcon from "../../Icons.jsx/VisabilityOnIcon.jsx";
import VisabilityOffIcon from "../../Icons.jsx/VisabilityOffIcon,.jsx";
import Pictures from "../StartPage/Pictures.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { restorePasswordPath } from "../../Constants/Paths.js";
import Form from "./Components/Form.jsx";
import onFormSubmit from "./Services/FormSubmit.js";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function onOtherServiceSubmit(event, service) {
    event.preventDefault();
    processSignInByOtherService(service);
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
        <h1 className={CommonStyles.title1}>Трекер Тренировок</h1>
        <div className={style.mainPanel}>
          <Form
            setSignInData={setSignInData}
            showPassword={showPassword}
            signInData={signInData}
          ></Form>
          <div>
            <button
              style={{ top: "-45px", left: "400px" }}
              className={styles.showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisabilityOnIcon /> : <VisabilityOffIcon />}
              <span></span>
            </button>
          </div>
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
          {/* <Link to={restorePasswordPath}>Забыли пароль?</Link> */}
          <div className={styles.registerButton}>
            <input
              type={"button"}
              className={styles.register}
              value={"Войти"}
              onClick={onFormSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
