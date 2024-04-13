export default function ({ excercise, setCurrentTab }) {
  return (
    <div>
      <button onClick={() => setCurrentTab("TrainingInfo")}>Назад</button>
      <label>{excercise.name}</label>
      <p>{excercise.description}</p>
      <label>Количество подходов: {excercise.approaches}</label>
      <label>Количество повторений: {excercise.repetitions}</label>
      <label>Ход выполнения</label>
      <p>{excercise.implementationProgress}</p>
      <div>{excercise.explanationVideo}</div>
    </div>
  );
}
