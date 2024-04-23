import { useEffect } from "react";
import TrainingInfo from "./TrainingInfo";

export default function ({
  currentTraining,
  currentTrainingDate,
  setCurrentExcercise,
  setCurrentTraining,
  navigate,
}) {
  return (
    <TrainingInfo
      setCurrentTraining={setCurrentTraining}
      training={currentTraining}
      date={currentTrainingDate}
      setCurrentExcercise={setCurrentExcercise}
      navigate={navigate}
    ></TrainingInfo>
  );
}
