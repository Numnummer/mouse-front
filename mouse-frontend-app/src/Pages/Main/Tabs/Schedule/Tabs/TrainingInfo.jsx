import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { postNewExcercise } from "../../../../../Api/Excercise/PostNewExcercise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { getTrainingById } from "../../../../../Api/Trainings/GetTrainingById";
import "./TrainingInfo.css"

export default function TrainingInfo({
  training,
  date,
  setCurrentTab,
  setCurrentExcercise,
  setCurrentTraining,
}) {
  const [open, setOpen] = useState(false);
  const [excercisePushSwitcher, setExcercisePushSwithcher] = useState(false);
  const [excerciseData, setExcerciseData] = useState({
    name: training.name,
    description: "",
    approaches: "",
    repetitions: "",
    implementationProgress: "",
    explanationVideo: "",
  });
  const [excercises, setExcercises] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExcerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onModalOk = () => {
    setOpen(false);
    postNewExcercise(training.id, excerciseData)
      .then((resp) => {
        setExcercisePushSwithcher(!excercisePushSwitcher);
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    getTrainingById(training.id)
      .then((result) => {
        setExcercises(result.exercises);
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  }, [excercisePushSwitcher]);

  return (
    <div className="user-page-container">
      <div className="user-page-container-training">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={2}
        ></ToastContainer>
        {/* <Button onClick={() => setCurrentTab("Main")}>Назад</Button> */}
        <div className="training-info">
          <label className="training-date">{format(date, "d MMMM yyyy", { locale: ru })}</label>
          <label className="training-name">{training.name}</label>
        </div>
        <div>
          <div className="training-types">
            <label>Наименование упражнения</label>
            <label>Количество повторений</label>
            <label>Количество подходов</label>
          </div>
          <hr className="hr-training"/>
          <div>
            {console.log(excercises)}
            {excercises.map((excercise, index) => {
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

        <Modal
          open={open}
          onOk={onModalOk}
          onCancel={() => setOpen(false)}
          width={600}
          footer={(_, { CancelBtn }) => (
            <>
              <Button type="primary" onClick={onModalOk}>
                Добавить упражнение
              </Button>
              <CancelBtn />
            </>
          )}
        >
          <div className="">
            <input
              name={"name"}
              onChange={handleInputChange}
              className="inputs"
              placeholder={"Наименование упражнения"}
            ></input>
          </div>
        </Modal>
        <Button className="add-training-button" onClick={() => setOpen(true)}>Добавить упражнение</Button>
      </div>
    </div>
  );
}
