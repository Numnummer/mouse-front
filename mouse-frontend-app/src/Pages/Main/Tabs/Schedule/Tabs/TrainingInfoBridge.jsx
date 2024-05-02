import { useEffect } from "react";
import TrainingInfo from "./TrainingInfo";

export default function ({
  currentTraining,
  currentTrainingDate,
  setCurrentExcercise,
  setCurrentTraining,
  navigate,
  navigatorSwitcher,
  setNavigatorSwitcher,
}) {
  return (
    <TrainingInfo
      setCurrentTraining={setCurrentTraining}
      trainingP={currentTraining}
      dateP={currentTrainingDate}
      setCurrentExcercise={setCurrentExcercise}
      navigate={navigate}
      navigatorSwitcher={navigatorSwitcher}
      setNavigatorSwitcher={setNavigatorSwitcher}
    ></TrainingInfo>
  );
}
