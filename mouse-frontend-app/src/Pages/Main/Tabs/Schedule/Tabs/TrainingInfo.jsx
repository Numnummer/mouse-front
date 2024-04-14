import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { postNewExcercise } from "../../../../../Api/Excercise/PostNewExcercise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { getTrainingById } from "../../../../../Api/Trainings/GetTrainingById";

export default function ({
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
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
      ></ToastContainer>
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
            name={"description"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Описание"}
          ></input>
          <input
            name={"implementationProgress"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Ход выполнения"}
          ></input>
          <input
            name={"explanationVideo"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Ссылка на видео"}
          ></input>
          <input
            name={"repetitions"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Количество повторений"}
          ></input>
          <input
            name={"approaches"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Количество подходов"}
          ></input>
        </div>
      </Modal>
      <button onClick={() => setOpen(true)}>Добавить упражнение</button>
    </div>
  );
}
