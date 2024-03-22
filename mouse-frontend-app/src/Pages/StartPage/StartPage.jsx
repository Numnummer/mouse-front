import styles from "./StartPage.module.css";
import Button from "./Components/Button/Button.jsx";
import Pictures from "./Pictures.jsx";

export default function StartPage() {
  return (
    <>
      <Pictures />
      <div className={styles.startPage}>
        <div className={styles.mainPanel}>
          <h1 className={styles.title1}>Трекер Тренировок</h1>
          <div className={styles.buttonPanel}>
            <Button text="Регистрация"></Button>
            <Button text="Вход"></Button>
          </div>
        </div>
      </div>
    </>
  );
}
