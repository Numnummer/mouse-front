import styles from "./StartPage.module.css";
import Button from "./Components/Button/Button.jsx";
import Pictures from "./Pictures.jsx";
import CommonStyles from "../../CommonStyles/CommonStyles.module.css"
import {useNavigate} from "react-router-dom";
import {enterPath, registrationPath} from "../../Constants/Paths.js";


export default function StartPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* <Pictures /> пока в процессе */}
      <div className={styles.startPage}>
        <div className={styles.mainPanel}>
          <h1 className={CommonStyles.title1}>Трекер Тренировок</h1>
          <div className={styles.buttonPanel}>
            <Button
                text="Регистрация"
                handler={()=> navigate(registrationPath)}
            />
            <Button
                text="Вход"
                handler={() => navigate(enterPath)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
