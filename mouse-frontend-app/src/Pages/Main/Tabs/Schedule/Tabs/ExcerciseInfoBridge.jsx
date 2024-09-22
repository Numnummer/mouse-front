import ExcerciseInfo from "./ExcerciseInfo.jsx";
export default function ({
  currentExcercise,
  navigatorSwitcher,
  setNavigatorSwitcher,
}) {
  return (
    <ExcerciseInfo
      excerciseP={currentExcercise}
      navigatorSwitcher={navigatorSwitcher}
      setNavigatorSwitcher={setNavigatorSwitcher}
    ></ExcerciseInfo>
  );
}
