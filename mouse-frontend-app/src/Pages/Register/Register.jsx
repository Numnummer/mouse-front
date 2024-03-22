import styles from './Register.module.css'
import {registrationTitle, title} from "../../Constants/Strings.js";
import {useState} from "react";
import processRegistration from "./Services/RegistrationService.js";
export default function Register(){
    const [registrationData, setRegistrationData]=useState({
        userName:'',
        firstName:'',
        lastName:'',
        role:'user',
        email:'',
        password:''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    function onRegistrationSubmit(event){
        console.log("hi")
        event.preventDefault()
        processRegistration(registrationData)
    }

    return (
        <div className={styles.page}>
            <label>{title}</label>
            <div className={'main-panel'}>
                <form onSubmit={onRegistrationSubmit}>
                    <label>{registrationTitle}</label>
                    <input
                        name="userName"
                        placeholder={'Никнейм'}
                        value={registrationData.userName}
                        onChange={handleInputChange}
                    />
                    <input
                        name="firstName"
                        placeholder={'Имя'}
                        value={registrationData.firstName}
                        onChange={handleInputChange}
                    />
                    <input
                        name="lastName"
                        placeholder={'Фамилия'}
                        value={registrationData.lastName}
                        onChange={handleInputChange}
                    />
                    <input
                        name="email"
                        placeholder={'Email'}
                        value={registrationData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        name="password"
                        placeholder={'Пароль'}
                        value={registrationData.password}
                        onChange={handleInputChange}
                    />
                    <input
                        type="checkbox"
                        onChange={e => {
                            let role='user'
                            if(e.target.checked) role='coach'
                            setRegistrationData({ ...registrationData, Role: role })}
                        }
                    />
                    <label>Я тренер</label>
                    <input type="submit" value={'Зарегистрироваться'} onClick={onRegistrationSubmit} />
                </form>
            </div>
        </div>
    );
}

