import Calendar from "../Components/Calendar/Calendar";
import "../Schedule.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";
import { startOfToday } from "date-fns";
import { postTraining } from "../../../../../Api/Trainings/PostTraining";

export default function ({
  setCurrentTab,
  setCurrentTraining,
  setCurrentTrainingDate,
}) {
  const [open, setOpen] = useState(false);
  const [trainingData, setTrainingData] = useState({
    name: "",
    trainingDate: "",
    exerciseIds: [],
  });
  const onAddTraining = () => {
    setOpen(false);
    setToday(startOfToday());
    postTraining(trainingData)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setTrainingData((prev) => ({ ...prev, trainingDate: dateString }));
  };
  const [today, setToday] = useState(startOfToday());
  const handleTrainingDayClick = (day, training) => {
    setCurrentTab("TrainingInfo");
    setCurrentTraining(training);
    setCurrentTrainingDate(day);
  };
  useEffect(() => {
    setTimeout(() => {
      setToday(startOfToday());
    }, 500);
  }, []);
  return (
    <div className="user-page-container">
      <label className="title-label">Расписание</label>
      <div className="user-calendar">
        <Calendar
          today={today}
          setToday={setToday}
          handleTrainingDayClick={handleTrainingDayClick}
        />
      </div>
      <Button className="add-training" onClick={() => setOpen(true)}>
        Добавить тренировку
      </Button>
      <Modal
        title="Добавить тренировку"
        open={open}
        onOk={() => {
          setToday(startOfToday());
          setOpen(false);
        }}
        onCancel={() => {
          setToday(startOfToday());
          setOpen(false);
        }}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <Button type="primary" onClick={onAddTraining}>
              Добавить тренировку
            </Button>
            <CancelBtn />
          </>
        )}
      >
        <div className="">
          <input
            className="inputs"
            placeholder={"Наименование тренировки"}
            value={trainingData.name}
            onChange={(event) => {
              setTrainingData((prev) => ({
                ...prev,
                name: event.target.value,
              }));
            }}
          ></input>
          <DatePicker className="date-picker" onChange={onChange} needConfirm />
        </div>
      </Modal>
    </div>
  );
}