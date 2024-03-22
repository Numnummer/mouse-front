export default function Main(){
    let token=localStorage.getItem('jwtToken')
    if (!token) {
        return <>
            <h1>Сессия устарела или вы не вошли</h1>
            <button>Войти</button>
        </>;
    }

    return (
        <div>

        </div>
    );
}