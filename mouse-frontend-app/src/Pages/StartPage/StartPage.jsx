import styles from "./StartPage.module.css";
import Button from "./Components/Button/Button.jsx";
import { button1Text, button2Text } from "./Constants/Strings.js";

export default function StartPage() {
  return (
    <div className={styles.startPage}>
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
