import styles from './Register.module.css'
import {registrationTitle, title} from "../../Constants/Strings.js";
export default function Register(){
    return(
        <div className={styles.page}>
            <label>{title}</label>
            <div className={'main-panel'}>
                <form>
                    <label>{registrationTitle}</label>
                    <input placeholder={'Никнейм'}/>
                    <input placeholder={'Имя'}/>
                    <input placeholder={'Фамилия'}/>
                    <input placeholder={'Email'}/>
                    <input placeholder={'Пароль'}/>
                    <input type={'checkbox'}/>
                    <label>Я трененер</label>
                    <input type={'submit'} value={'Зарегистрироваться'}/>
                </form>
            </div>
        </div>
    )
}