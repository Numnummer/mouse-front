import "./ExcerciseInfo.css";
import image from "../../../../../../public/video-image.png";

export default function ExerciseInfo({ excercise }) {
  return (
    <div className="user-page-container">
      <div className="exercise-container">
        {/* <button onClick={() => setCurrentTab("TrainingInfo")}>Назад</button> */}
        <label className="excercise-name">{excercise.name}</label>
        <p className="excercise-description">{excercise.description}</p>
        <div className="excercise-types">
          <label>Количество подходов: {excercise.approaches}</label>
          <label>Количество повторений: {excercise.repetitions}</label>
        </div>
        <div className="hod">
          <label>Ход выполнения</label>
          <p>{excercise.implementationProgress}</p>
        </div>
        Ссылка на видео:
        <a className="exercise-video-" href={excercise.explanationVideo}>
          <img width="322px" className="exercise-img-" src={image} />
        </a>
      </div>
    </div>
  );
}
