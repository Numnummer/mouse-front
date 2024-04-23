import {
  enterPath,
  mainPath,
  registrationPath,
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

function App() {
  return (
    <>
      <Routes>
        <Route path={registrationPath} element={Register()}></Route>
        <Route path={mainPath} element={MainBridge()}></Route>
        <Route path={enterPath} element={SignIn()}></Route>
        <Route path={startPagePath} element={StartPage()}></Route>
        <Route path={vkPath} element={VkAuth()}></Route>
      </Routes>
    </>
  );
}

export default App;
