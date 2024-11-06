import {
  enterPath,
  googlePath,
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
import MainBridge from "./Pages/Main/Tabs/MainBridge.jsx";
import RestorePassword from "./Pages/RestorePassword/RestorePassword.jsx";
import React from "react";
import VkAuthBridge from "./Pages/Vk/VkAuthBridge.jsx";
import GoogleAuth from "./Pages/Google/GoogleAuth.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={registrationPath} element={Register()}></Route>
        <Route path={mainPath} element={MainBridge()}></Route>
        <Route path={enterPath} element={SignIn()}></Route>
        <Route path={startPagePath} element={StartPage()}></Route>
        <Route path={vkPath} element={VkAuthBridge()}></Route>
        <Route path={restorePasswordPath} element={RestorePassword()}></Route>
        <Route path={googlePath} element={GoogleAuth()}></Route>
      </Routes>
    </>
  );
}

export default App;
