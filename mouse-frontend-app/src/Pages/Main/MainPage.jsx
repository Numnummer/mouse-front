import { useEffect, useState } from "react";
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
import LogOutIcon from "./Tabs/Profile/Icons/LogOutIcon";
import { useNavigate } from "react-router-dom";
import checkUserProfile from "../../Api/UserProfile/CheckUserProfile";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Modal } from "antd";
import SupportChat from "./Components/SupportChat/SupportChat";
import { modalStyles } from "./CustomStyles/ModalStyles";
import Products from "./Tabs/Products/Products.jsx";

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

  // Состояние показа/непоказа окна поддержки
  const [chatOpen, setChatOpen] = useState(false);

  const [tabSwitcher, setTabSwitcher] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
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
      console.log(response);
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
  useEffect(() => {
    setTabSwitcher(!tabSwitcher);
  }, [currentTab]);
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
      currentTabComponent = <Schedule currentTab={currentTab}></Schedule>;
      localStorage.setItem(currentProfileItem, "Schedule");
      break;
    case "MyExcercises":
      currentTabComponent = <MyExcercises></MyExcercises>;
      localStorage.setItem(currentProfileItem, "MyExcercises");
      break;
    case "Messages":
      currentTabComponent = <Messages currentTab={currentTab}></Messages>;
      localStorage.setItem(currentProfileItem, "Messages");
      break;
    case "Products":
      currentTabComponent = <Products></Products>;
      localStorage.setItem(currentProfileItem, "Messages");
      break;
    default:
      break;
  }

  return (
    <div className="menuflex">
      <ToastContainer limit={1}></ToastContainer>
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
              setChatOpen(true);
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
          <div
            className="tab"
            onClick={() => {
              setCurrentTab("Products");
            }}
          >
            <label>Продукты</label>
          </div>
          <div
            className="tab_logout"
            onClick={() => {
              localStorage.setItem(authToken, "");
              navigate("/");
            }}
          >
            <LogOutIcon />
            <label className="logout_label">Выход</label>
          </div>
        </div>
      </div>
      {currentTabComponent}
      <Modal
        title="Чат поддержки"
        open={chatOpen}
        onOk={() => {
          setChatOpen(false);
        }}
        onCancel={() => {
          setChatOpen(false);
        }}
        styles={modalStyles}
      >
        <SupportChat></SupportChat>
      </Modal>
    </div>
  );
}
