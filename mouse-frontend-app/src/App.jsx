import {
  enterPath,
  mainPath,
  registrationPath,
  restorePasswordPath,
  startPagePath,
  vkPath,
} from "./Constants/Paths.js";
import StartPage from "./Pages/StartPage/StartPage.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register/Register.jsx";
import Profile from "./Pages/Main/Tabs/Profile/Profile.jsx";
import MainPage from "./Pages/Main/MainPage.jsx";
import MainBridge from "./Pages/Main/Tabs/MainBridge.jsx";
import { useEffect } from "react";
import VkAuth from "./Pages/Vk/VkAuth.jsx";
import RestorePassword from "./Pages/RestorePassword/RestorePassword.jsx";
import Vk from "./Pages/SignIn/vk/Vk.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={registrationPath} element={Register()}></Route>
        <Route path={mainPath} element={MainBridge()}></Route>
        <Route path={enterPath} element={SignIn()}></Route>
        <Route path={startPagePath} element={StartPage()}></Route>
        <Route path={vkPath} element={VkAuth()}></Route>
        <Route path={restorePasswordPath} element={RestorePassword()}></Route>
      </Routes>
    </>
  );
}

export default App;
