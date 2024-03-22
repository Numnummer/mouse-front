import styles from "./StartPage.module.css";
import Button from "./Components/Button/Button.jsx";
import { registrationTitle, signInTitle } from "/src/Constants/Strings.js";
import image from '/public/image.png'

export default function StartPage() {
  return (
    <div className={styles.startPage}>
    <img src={image} alt="аа2у" />
      <div className={styles.mainPanel}>
        <h1 className={styles.title1}>Трекер Тренировок</h1>
        <div className={styles.buttonPanel}>
          <Button text={registrationTitle}></Button>
          <Button text={signInTitle}></Button>
        </div>
      </div>
    </div>
  );
}
