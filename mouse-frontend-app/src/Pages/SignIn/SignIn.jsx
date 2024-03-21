import styles from "../Register/Register.module.css";
import {signInTitle, title} from "../../Constants/Strings.js";

export default function SignIn(){
    return(
        <div className={styles.page}>
            <label>{title}</label>
            <div className={'main-panel'}>
                <form>
                    <label>{signInTitle}</label>
                    <input placeholder={'Email'}/>
                    <input placeholder={'Пароль'}/>
                    <input type={'submit'} value={'Войти'}/>
                </form>
                <button>VK</button>
                <button>Google</button>
                <button>Yandex</button>
            </div>
        </div>
    )
}