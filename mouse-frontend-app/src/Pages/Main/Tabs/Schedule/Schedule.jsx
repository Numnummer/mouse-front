// import Button from "../../../StartPage/Components/Button/Button";

import { useEffect, useState } from "react";
import Main from "./Tabs/Main.jsx";
import TrainingInfo from "./Tabs/TrainingInfo.jsx";
import ExcerciseInfo from "./Tabs/ExcerciseInfo.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import TrainingInfoBridge from "./Tabs/TrainingInfoBridge.jsx";
import ExcerciseInfoBridge from "./Tabs/ExcerciseInfoBridge.jsx";
//import { useHistory } from "react-router-dom";

export default function Schedule() {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState();
  const [currentTraining, setCurrentTraining] = useState({});
  const [currentTrainingDate, setCurrentTrainingDate] = useState();
  const [currentExcercise, setCurrentExcercise] = useState({});
  let componentToShow = (
    <Main
      setCurrentTab={setCurrentTab}
      setCurrentTraining={setCurrentTraining}
      setCurrentTrainingDate={setCurrentTrainingDate}
    ></Main>
  );
  switch (currentTab) {
    case "Main":
      componentToShow = (
        <Main
          setCurrentTab={setCurrentTab}
          setCurrentTraining={setCurrentTraining}
          setCurrentTrainingDate={setCurrentTrainingDate}
        ></Main>
      );
      break;
    case "TrainingInfo":
      componentToShow = (
        <TrainingInfo
          setCurrentTraining={setCurrentTraining}
          training={currentTraining}
          date={currentTrainingDate}
          setCurrentTab={setCurrentTab}
          setCurrentExcercise={setCurrentExcercise}
        ></TrainingInfo>
      );
      break;
    case "ExcerciseInfo":
      componentToShow = (
        <ExcerciseInfo
          excercise={currentExcercise}
          setCurrentTab={setCurrentTab}
        ></ExcerciseInfo>
      );
      break;
    default:
      break;
  }
  //return componentToShow;
  return (
    <Routes>
      <Route
        path="/"
        element={Main({ setCurrentTraining, setCurrentTrainingDate, navigate })}
      ></Route>
      <Route
        path="/trainingInfo"
        element={TrainingInfoBridge({
          currentTraining,
          currentTrainingDate,
          setCurrentExcercise,
          setCurrentTraining,
          navigate,
        })}
      ></Route>
      <Route
        path="/excerciseInfo"
        element={ExcerciseInfoBridge({ currentExcercise })}
      ></Route>
    </Routes>
  );
}
