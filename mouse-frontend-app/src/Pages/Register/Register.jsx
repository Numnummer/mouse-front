import styles from "./Register.module.css";
import { useState } from "react";
import processRegistration from "./Services/RegistrationService.js";
import CommonStyles from "../../CommonStyles/CommonStyles.module.css";

export default function Register() {
  const [registrationData, setRegistrationData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    role: "user",
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

  function onRegistrationSubmit(event) {
    event.preventDefault();
    processRegistration(registrationData);
  }

  return (
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
              name="password"
              placeholder={"Пароль"}
              value={registrationData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.coachTitle}>
            <input
              className={styles.checkboxCoach}
              type="checkbox"
              onChange={(e) => {
                let role = "user";
                if (e.target.checked) role = "coach";
                setRegistrationData({ ...registrationData, Role: role });
              }}
            />
            <label>Я тренер</label>
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
  );
}
