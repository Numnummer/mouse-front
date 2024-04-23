import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { postNewExcerciseOnTraining } from "../../../../../Api/Excercise/PostNewExcercise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { getTrainingById } from "../../../../../Api/Trainings/GetTrainingById";
import { getAllExcercises } from "../../../../../Api/Excercise/GetAllExcercises";
import "./TrainingInfo.css";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { deleteTraining } from "../../../../../Api/Trainings/DeleteTraining";

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
  const [items, setItems] = useState([]);

  const [excerciseNames, setExcerciseNames] = useState([]);

  const [selectName, setSelectName] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExcerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onModalOk = () => {
    const data = items.find((item) => item.name === selectName);
    setExcerciseData(data);
    setOpen(false);
    postNewExcerciseOnTraining(training.id, data)
      .then((resp) => {
        setExcercisePushSwithcher(!excercisePushSwitcher);
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
    console.log(selectName);
  };

  const onDeleteTraining = () => {
    deleteTraining(training.id).then(() => {
      setCurrentTab("Main");
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
    getAllExcercises().then((result) => {
      setItems(result.items);
      const names = result.items.map((item, index) => item.name);
      setExcerciseNames(names);
      setSelectName(names[0] || null);
      console.log(result.items.map((item, index) => item.name));
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
          <label className="training-date">
            {format(date, "d MMMM yyyy", { locale: ru })}
          </label>
          <button onClick={onDeleteTraining}>Удалить тренировку</button>
          <label className="training-name">{training.name}</label>
        </div>
        <div className="training-types-container">
          <div className="training-types">
            <label>Наименование упражнения</label>
            <label>Количество повторений</label>
            <label>Количество подходов</label>
          </div>
          {/* <hr className="hr-training" /> */}
          <div>
            {excercises.map((excercise, index) => {
              return (
                <div className="excercises-line" key={index}>
                  <hr className="hr-training" />
                  <div
                    className="excercise-container"
                    key={index}
                    onClick={() => {
                      setCurrentTab("ExcerciseInfo");
                      setCurrentExcercise(excercise);
                    }}
                  >
                    <label className="training-info-excercise-name">
                      {excercise.name}
                    </label>
                    <label>{excercise.repetitions}</label>
                    <label>{excercise.approaches}</label>
                  </div>
                </div>
              );
            })}
          </div>
          <br />
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
          {" "}
          <>
            <select
              className="custom-select"
              onChange={(event) => {
                setSelectName(event.target.value);
                console.log(event.target.value);
              }}
            >
              {excerciseNames.map((exercise, index) => (
                <option className="custom-option" value={exercise} key={index}>
                  {exercise}
                </option>
              ))}
            </select>
          </>
        </Modal>
        <Button className="add-training-button" onClick={() => setOpen(true)}>
          Добавить упражнение
        </Button>
      </div>
    </div>
  );
}
