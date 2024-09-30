import PropTypes from "prop-types";
import TrainingInfo from "./TrainingInfo";
import React from "react";

export default function TrainingInfoBridge({
  currentTraining,
  currentTrainingDate,
  setCurrentExcercise,
  navigate,
  navigatorSwitcher,
  setNavigatorSwitcher,
}) {
  return (
    <TrainingInfo
      currentTraining={currentTraining}
      currentTrainingDate={currentTrainingDate}
      setCurrentExcercise={setCurrentExcercise}
      navigate={navigate}
      navigatorSwitcher={navigatorSwitcher}
      setNavigatorSwitcher={setNavigatorSwitcher}
    ></TrainingInfo>
  );
}

TrainingInfoBridge.propTypes = {
  currentTraining: PropTypes.object.isRequired,
  currentTrainingDate: PropTypes.object.isRequired,
  setCurrentExcercise: PropTypes.func.isRequired,
  navigate: PropTypes.object.isRequired,
  navigatorSwitcher: PropTypes.bool.isRequired,
  setNavigatorSwitcher: PropTypes.func.isRequired,
};
