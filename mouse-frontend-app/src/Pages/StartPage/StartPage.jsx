import styles from './StartPage.module.css'
import Button from "./Components/Button/Button.jsx";
import {button1Text, button2Text, title} from "./Constants/Strings.js";


export default function StartPage() {
    return (
        <div className={styles.background}>
            <div className={styles.mainPanel}>
                <label className={styles.title}>{title}</label>
                <div className={styles.buttonPanel}>
                    <Button text={button1Text}></Button>
                    <Button text={button2Text}></Button>
                </div>
            </div>
        </div>
    )
}