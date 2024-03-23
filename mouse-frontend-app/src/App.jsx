import {
  enterPath,
  mainPath,
  registrationPath,
  startPagePath,
} from "./Constants/Paths.js";
import StartPage from "./Pages/StartPage/StartPage.jsx";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import Main from "./Pages/Main/Main.jsx";
import Register from "./Pages/Register/Register.jsx";
import Profile from "./Pages/Main/Tabs/Profile/Profile.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path={registrationPath} element={Register()}></Route>
        <Route path={mainPath} element={Main()}></Route>
        <Route path={startPagePath} element={StartPage()}></Route>
        <Route path={enterPath} element={SignIn()}></Route>
        {/* потом убрать*/}
        <Route path="/profile" element={Profile()}></Route>
      </Routes>
    </>
  );
}

export default App;
