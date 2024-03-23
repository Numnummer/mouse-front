import {useEffect, useState} from "react";
import Profile from "./Tabs/Profile/Profile";
import Schedule from "./Tabs/Schedule/Schedule";
import MyExcercises from './Tabs/MyExcercises/MyExcercises'
import Messages from './Tabs/Messages/Messages'

export default function Main(){
    let token=localStorage.getItem('jwtToken')        
    if (!token) {
        return <>
            <h1>Войдите в систему</h1>
            <button>Войти</button>
        </>;
    }

    const [currentTab,setCurrentTab]=useState(localStorage.getItem('currentTab'))
    useEffect(()=>{
        localStorage.setItem('currentTab',currentTab)
    },[currentTab])
    let currentTabComponent=<Profile></Profile>
    switch (currentTab) {
        case 'Schedule':
            currentTabComponent=<Schedule></Schedule>
            break;
        case 'MyExcercises':
            currentTabComponent=<MyExcercises></MyExcercises>
            break;  
        case 'Messages':
            currentTabComponent=<Messages></Messages>
            break;    
        default:
            break;
    }

    return (
        <div>

        </div>
    );
}