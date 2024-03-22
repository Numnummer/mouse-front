import styles from "../Register/Register.module.css";
import {signInTitle, title} from "../../Constants/Strings.js";
import {useState} from "react";
import {processSignIn, processSignInByOtherService} from "./Services/SignInService.js";

export default function SignIn(){
    const [signInData,setSignInData]=useState({
        email:'',
        password:''
    })
    function onFormSubmit(event){
        event.preventDefault()
        processSignIn(signInData)
    }
    function onOtherServiceSubmit(event,service){
        event.preventDefault()
        processSignInByOtherService(service)
    }

    return(
        <div className={styles.page}>
            <label>{title}</label>
            <div className={'main-panel'}>
                <form>
                    <label>{signInTitle}</label>
                    <input placeholder={'Email'} onChange={(event)=>{
                        setSignInData({...signInData,email:event.target.value})
                    }}/>
                    <input placeholder={'Пароль'} onChange={(event)=>{
                        setSignInData({...signInData,password:event.target.value})
                    }}/>
                    <input type={'submit'} value={'Войти'} onClick={onFormSubmit}/>
                </form>
                <button onClick={(event)=>onOtherServiceSubmit(event,'Vk')}>VK</button>
                <button onClick={(event)=>onOtherServiceSubmit(event,'Google')}>Google</button>
                <button onClick={(event)=>onOtherServiceSubmit(event,'Yandex')}>Yandex</button>
            </div>
        </div>
    )
}