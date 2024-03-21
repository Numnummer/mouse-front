import styles from "./StartPage.module.css";
import Button from "./Components/Button/Button.jsx";
import { button1Text, button2Text } from "./Constants/Strings.js";

export default function StartPage() {
  return (
    <div className={styles.startPage}>
    <img src="C:\Users\79991\mouse-front\mouse-frontend-app\public\image.png" alt="аа2у" />
      <div className={styles.mainPanel}>
        <h1 className={styles.title1}>Трекер Тренировок</h1>
        <div className={styles.buttonPanel}>
          <Button text={button1Text}></Button>
          <Button text={button2Text}></Button>
        </div>
      </div>
    </div>
  );
}
