import styles from "./Button.module.css";
export default function Button({ text, handler }) {
  return (
    <button className={styles.button} onClick={handler}>
      {text}
    </button>
  );
}
