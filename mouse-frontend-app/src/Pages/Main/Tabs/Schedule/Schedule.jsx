// import Button from "../../../StartPage/Components/Button/Button";

import { useState } from "react";
import Main from "./Tabs/Main.jsx";
import TrainingInfo from "./Tabs/TrainingInfo.jsx";
import ExcerciseInfo from "./Tabs/ExcerciseInfo.jsx";

export default function Schedule() {
  const [currentTab, setCurrentTab] = useState();
  const [currentTraining, setCurrentTraining] = useState();
  const [currentTrainingDate, setCurrentTrainingDate] = useState();
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
          training={currentTraining}
          date={currentTrainingDate}
          setCurrentTab={setCurrentTab}
        ></TrainingInfo>
      );
      break;
    case "ExcerciseInfo":
      componentToShow = <ExcerciseInfo></ExcerciseInfo>;
      break;
    default:
      break;
  }
  return componentToShow;
}
