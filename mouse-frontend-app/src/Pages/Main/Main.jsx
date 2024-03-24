import { useEffect, useState } from "react";
import Profile from "./Tabs/Profile/Profile";
import Schedule from "./Tabs/Schedule/Schedule";
import MyExcercises from "./Tabs/MyExcercises/MyExcercises";
import Messages from "./Tabs/Messages/Messages";
import useTab from "./CustomHooks/UseTab";
import { authToken } from "../../Constants/LocalStorageItemKeys";
import getCurrentUserInfo from "../../Api/User/GetCurrentUserInfo";
import { enableAuth } from "../../Constants/Auth";
import "./Main.css";

export default function Main() {
  if (enableAuth) {
    let token = localStorage.getItem(authToken);
    if (!token) {
      return (
        <>
          <h1>Войдите в систему</h1>
          <button>Войти</button>
        </>
      );
    }
  }
  const [currentTab, setCurrentTab] = useTab();

  let currentTabComponent = <Profile isProfileExists={false}></Profile>;
  switch (currentTab) {
    case "Schedule":
      currentTabComponent = <Schedule></Schedule>;
      break;
    case "MyExcercises":
      currentTabComponent = <MyExcercises></MyExcercises>;
      break;
    case "Messages":
      currentTabComponent = <Messages></Messages>;
      break;
    default:
      break;
  }

  return (
    <div className="menuflex">
      <div className="menu">
        <div className="user-info-header-left">
          <div className="user-icon"></div>
          <div className="username">Имя пользователя</div>
        </div>
        <div>Расписание</div>
        <div>Сообщения</div>
        <div>Мои упражнения</div>
      </div>
      {currentTabComponent}
    </div>
  );
}
