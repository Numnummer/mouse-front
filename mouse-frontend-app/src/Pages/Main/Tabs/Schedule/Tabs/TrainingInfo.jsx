import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export default function ({
  training,
  date,
  setCurrentTab,
  setCurrentExcercise,
}) {
  console.log(training);
  console.log(date);
  return (
    <div>
      <button onClick={() => setCurrentTab("Main")}>Назад</button>
      <label>{format(date, "d MMMM yyyy", { locale: ru })}</label>
      <label>{training.name}</label>
      <div>
        <div>
          <label>Наименование упражнения</label>
          <label>Количество повторений</label>
          <label>Количество подходов</label>
        </div>
        <div>
          {training.exercises.map((excercise, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCurrentTab("ExcerciseInfo");
                  setCurrentExcercise(excercise);
                }}
              >
                <label>{excercise.name}</label>
                <label>{excercise.repetitions}</label>
                <label>{excercise.approaches}</label>
              </div>
            );
          })}
        </div>
      </div>
      <button>Добавить упражнение</button>
    </div>
  );
}
