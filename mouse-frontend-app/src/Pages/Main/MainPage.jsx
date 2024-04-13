import { useEffect, useLayoutEffect, useState } from "react";
import Profile from "./Tabs/Profile/Profile";
import Schedule from "./Tabs/Schedule/Schedule";
import MyExcercises from "./Tabs/MyExcercises/MyExcercises";
import Messages from "./Tabs/Messages/Messages";
import useTab from "./CustomHooks/UseTab";
import {
  authToken,
  currentProfileItem,
  userNameItem,
} from "../../Constants/LocalStorageItemKeys";
import getCurrentUserInfo from "../../Api/User/GetCurrentUserInfo";
import { enableAuth } from "../../Constants/Auth";
import "./Main.css";
import MessagesIcon from "./Tabs/Profile/Icons/MessagesIcon";
import ScheduleIcon from "./Tabs/Profile/Icons/ScheduleIcon";
import MyExcercisesIcon from "./Tabs/Profile/Icons/MyExcercisesIcon";
import { useNavigate } from "react-router-dom";
import checkUserProfile from "../../Api/UserProfile/CheckUserProfile";

export default function MainPage() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useTab();
  function goToEnter() {
    navigate("/Enter");
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
  const [userData, setUserData] = useState({
    firstName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    phoneNumber: "",
    email: "",
    gender: "",
  });
  const [isProfileExists, setIsProfileExists] = useState(false);
  const parseToNormalDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const localeDate = dateObj.toLocaleDateString("en-GB", options);
    const parts = localeDate.split("/");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };
  const loadProfile = () => {
    getCurrentUserInfo().then((response) => {
      response.dateOfBirth = parseToNormalDate(response.dateOfBirth);
      setUserData(response);
      localStorage.setItem(userNameItem, response.firstName);
      if (response) {
        checkUserProfile().then((result) => {
          setIsProfileExists(result);
        });
      }
    });
  };
  useEffect(() => {
    if (localStorage.getItem(currentProfileItem)) {
      setCurrentTab(localStorage.getItem(currentProfileItem));
    } else {
      setCurrentTab("Profile");
    }
    loadProfile();
  }, []);

  let currentTabComponent;
  switch (currentTab) {
    case "Profile":
      currentTabComponent = (
        <Profile
          userData={userData}
          setUserData={setUserData}
          isProfileExists={isProfileExists}
          setIsProfileExists={setIsProfileExists}
        ></Profile>
      );
      localStorage.setItem(currentProfileItem, "Profile");
      break;
    case "Schedule":
      currentTabComponent = <Schedule></Schedule>;
      localStorage.setItem(currentProfileItem, "Schedule");
      break;
    case "MyExcercises":
      currentTabComponent = <MyExcercises></MyExcercises>;
      localStorage.setItem(currentProfileItem, "MyExcercises");
      break;
    case "Messages":
      currentTabComponent = <Messages></Messages>;
      localStorage.setItem(currentProfileItem, "Messages");
      break;
    default:
      break;
  }

  return (
    <div className="menuflex">
      <div className="menu">
        <div
          onClick={() => {
            setCurrentTab("Profile");
          }}
          className="user-info-header-left"
        >
          <div className="user-icon"></div>
          <div className="username">{localStorage.getItem(userNameItem)}</div>
        </div>
        <div className="tabs">
          <div
            className="tab"
            onClick={() => {
              setCurrentTab("Schedule");
            }}
          >
            <ScheduleIcon className="ds" />
            <label>Расписание</label>
          </div>
          <div
            className="tab"
            onClick={() => {
              setCurrentTab("Messages");
            }}
          >
            <MessagesIcon />
            <label>Сообщения</label>
          </div>
          <div
            className="tab"
            onClick={() => {
              setCurrentTab("MyExcercises");
            }}
          >
            <MyExcercisesIcon />
            <label>Мои упражнения</label>
          </div>
        </div>
      </div>
      {currentTabComponent}
    </div>
  );
}
