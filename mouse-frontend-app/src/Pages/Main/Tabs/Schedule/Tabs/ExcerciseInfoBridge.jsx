import PropTypes from "prop-types";
import ExcerciseInfo from "./ExcerciseInfo.jsx";
import React from "react";

export default function ExcerciseInfoBridge({
  currentExcercise,
  navigatorSwitcher,
}) {
  return (
    <ExcerciseInfo
      currentExcercise={currentExcercise}
      navigatorSwitcher={navigatorSwitcher}
    ></ExcerciseInfo>
  );
}

ExcerciseInfoBridge.propTypes = {
  currentExcercise: PropTypes.object.isRequired,
  navigatorSwitcher: PropTypes.bool.isRequired,
};
