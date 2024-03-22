import {useEffect} from "react";

export default function Main(){
    let token=localStorage.getItem('jwtToken')
    useEffect(()=>{

    },[])
    if (!token) {
        return <>
            <h1>Войдите в систему</h1>
            <button>Войти</button>
        </>;
    }

    return (
        <div>

        </div>
    );
}