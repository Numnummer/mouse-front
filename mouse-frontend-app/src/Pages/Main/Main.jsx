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
import MessagesIcon from "./Tabs/Profile/Icons/MessagesIcon";
import ScheduleIcon from "./Tabs/Profile/Icons/ScheduleIcon";
import MyExcercisesIcon from "./Tabs/Profile/Icons/MyExcercisesIcon";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useTab();
  function goToEnter() {
    navigate("Enter");
  }
  if (enableAuth) {
    let token = localStorage.getItem(authToken);
    if (!token) {
      return (
        <>
          <h1>Войдите в систему</h1>
          <button onClick={goToEnter}>Войти</button>
        </>
      );
    }
  }

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
        <div>
          <div>
            <ScheduleIcon className="ds" />
            Расписание
          </div>
          <div>
            <MessagesIcon />
            Сообщения
          </div>
          <div>
            <MyExcercisesIcon />
            Мои упражнения
          </div>
        </div>
      </div>
      {currentTabComponent}
    </div>
  );
}
