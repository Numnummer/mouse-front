import styles from './StartPage.module.css'
import Button from "./Components/Button/Button.jsx";
import {registrationTitle, signInTitle, title} from "../../Constants/Strings.js";


export default function StartPage() {
    return (
        <div className={styles.background}>
            <div className={styles.mainPanel}>
                <label className={styles.title}>{title}</label>
                <div className={styles.buttonPanel}>
                    <Button text={registrationTitle}></Button>
                    <Button text={signInTitle}></Button>
                </div>
            </div>
        </div>
    )
}