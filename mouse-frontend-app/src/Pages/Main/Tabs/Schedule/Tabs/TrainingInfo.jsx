import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { postNewExcerciseOnTraining } from "../../../../../Api/Excercise/PostNewExcercise";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { getTrainingById } from "../../../../../Api/Trainings/GetTrainingById";
import { getAllExcercises } from "../../../../../Api/Excercise/GetAllExcercises";
import "./TrainingInfo.css";
import { deleteTraining } from "../../../../../Api/Trainings/DeleteTraining";
import {
  dateParam,
  trainingParam,
} from "../../../../../Constants/LocalStorageItemKeys";
import GarbageIcon from "../../Profile/Icons/GarbageIcon";
import React from "react";
import PropTypes from "prop-types";

export default function TrainingInfo({
  currentTraining,
  currentTrainingDate,
  setCurrentExcercise,
  navigate,
  navigatorSwitcher,
  setNavigatorSwitcher,
}) {
  const [open, setOpen] = useState(false);
  const [excercisePushSwitcher, setExcercisePushSwithcher] = useState(false);
  const [excercises, setExcercises] = useState([]);
  const [items, setItems] = useState([]);

  const [excerciseNames, setExcerciseNames] = useState([]);

  const [selectName, setSelectName] = useState();

  const [date, setDate] = useState(currentTrainingDate);
  const [training, setTraining] = useState(currentTraining);

  useEffect(() => {
    if (!date) {
      setTraining(JSON.parse(localStorage.getItem(trainingParam)));
      setDate(JSON.parse(localStorage.getItem(dateParam)));
    } else {
      localStorage.setItem(trainingParam, JSON.stringify(training));
      localStorage.setItem(dateParam, JSON.stringify(date));
    }
  }, [navigatorSwitcher]);

  const onModalOk = () => {
    const data = items.find((item) => item.name === selectName);
    setOpen(false);
    postNewExcerciseOnTraining(training.id, data)
      .then(() => {
        toast.success("Упражнение добавлено", { autoClose: 2000 });
        setExcercisePushSwithcher(!excercisePushSwitcher);
      })
      .catch((error) => {
        toast.error(error, { autoClose: 2000 });
      });
  };

  const onDeleteTraining = () => {
    deleteTraining(training.id).then(() => {
      setNavigatorSwitcher(!navigatorSwitcher);
      navigate("/Main");
    });
  };

  useEffect(() => {
    let trainingId = training.id;
    if (!training.id) {
      trainingId = JSON.parse(localStorage.getItem(trainingParam)).id;
    }
    getTrainingById(trainingId)
      .then((result) => {
        setExcercises(result.exercises);
      })
      .catch(() => {
        toast.error("Не удалось подгрузить упражнения", { autoClose: 2000 });
      });
    getAllExcercises().then((result) => {
      setItems(result.items);
      const names = result.items.map((item) => item.name);
      setExcerciseNames(names);
      setSelectName(names[0] || null);
    });
  }, [excercisePushSwitcher, navigatorSwitcher]);

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
            {date && format(date, "d MMMM yyyy", { locale: ru })}
          </label>
          <Tooltip title="Удалить тренировку">
            <Button
              className="delete-training-button"
              onClick={onDeleteTraining}
              icon={<GarbageIcon />}
            ></Button>
          </Tooltip>
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
                      setNavigatorSwitcher(!navigatorSwitcher);
                      navigate("/Main/excerciseInfo");
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

TrainingInfo.propTypes = {
  currentTraining: PropTypes.object.isRequired,
  currentTrainingDate: PropTypes.object.isRequired,
  setCurrentExcercise: PropTypes.func.isRequired,
  navigate: PropTypes.object.isRequired,
  navigatorSwitcher: PropTypes.bool.isRequired,
  setNavigatorSwitcher: PropTypes.func.isRequired,
};
