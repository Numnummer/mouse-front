import { useEffect, useState } from "react";
import Main from "./Tabs/Main.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import TrainingInfoBridge from "./Tabs/TrainingInfoBridge.jsx";
import ExcerciseInfoBridge from "./Tabs/ExcerciseInfoBridge.jsx";
import React from "react";
import PropTypes from "prop-types";

export default function Schedule({ currentTab }) {
  const navigate = useNavigate();
  const [currentTraining, setCurrentTraining] = useState({});
  const [currentTrainingDate, setCurrentTrainingDate] = useState();
  const [currentExcercise, setCurrentExcercise] = useState({});
  const [navigatorSwitcher, setNavigatorSwitcher] = useState(false);

  useEffect(() => {
    setNavigatorSwitcher(!navigatorSwitcher);
  }, [currentTab]);

  return (
    <Routes>
      <Route
        path="/"
        element={Main({
          setCurrentTraining,
          setCurrentTrainingDate,
          navigate,
          navigatorSwitcher,
          setNavigatorSwitcher,
        })}
      ></Route>
      <Route
        path="/trainingInfo"
        element={TrainingInfoBridge({
          currentTraining,
          currentTrainingDate,
          setCurrentExcercise,
          setCurrentTraining,
          navigate,
          navigatorSwitcher,
          setNavigatorSwitcher,
        })}
      ></Route>
      <Route
        path="/excerciseInfo"
        element={ExcerciseInfoBridge({
          currentExcercise,
          navigatorSwitcher,
          setNavigatorSwitcher,
        })}
      ></Route>
    </Routes>
  );
}

Schedule.propTypes = {
  currentTab: PropTypes.string.isRequired,
};
