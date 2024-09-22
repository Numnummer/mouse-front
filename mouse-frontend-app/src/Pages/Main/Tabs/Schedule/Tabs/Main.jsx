import Calendar from "../Components/Calendar/Calendar";
import "../Schedule.css";
import { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";
import { startOfToday } from "date-fns";
import { postTraining } from "../../../../../Api/Trainings/PostTraining";
import { getAllTrainings } from "../../../../../Api/Trainings/GetAllTrainings";

export default function Main({
  setCurrentTraining,
  setCurrentTrainingDate,
  navigate,
  navigatorSwitcher,
  setNavigatorSwitcher,
}) {
  const [open, setOpen] = useState(false);
  const [trainingData, setTrainingData] = useState({
    name: "",
    trainingDate: "",
    exerciseIds: [],
  });
  const [switcher, setSwitcher] = useState(false);
  const [allTrainings, setAllTrainings] = useState({});

  const onAddTraining = () => {
    setSwitcher(!switcher);
    setOpen(false);
    setToday(startOfToday());
    postTraining(trainingData)
      .then((result) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchTrainings = () => {
    getAllTrainings()
      .then((result) => {
        setAllTrainings(result);
        setToday(startOfToday());
      })
      .catch((error) => {});
  };
  useEffect(() => {
    fetchTrainings();
  }, [navigatorSwitcher]);
  const onChange = (date, dateString) => {
    setTrainingData((prev) => ({ ...prev, trainingDate: dateString }));
  };
  const [today, setToday] = useState(startOfToday());
  const handleTrainingDayClick = (day, training) => {
    setNavigatorSwitcher((prev) => !prev);
    navigate("/Main/trainingInfo");
    setCurrentTraining(training);
    setCurrentTrainingDate(day);
  };
  useEffect(() => {
    setTimeout(() => {
      setToday(startOfToday());
    }, 500);
  }, []);
  const modalStyles = {
    mask: {
      backdropFilter: "blur(10px)",
    },
  };
  return (
    <div className="user-page-container">
      <label className="title-label">Расписание</label>
      <div className="user-calendar">
        <Calendar
          today={today}
          setToday={setToday}
          handleTrainingDayClick={handleTrainingDayClick}
          switcher={switcher}
          allTrainings={allTrainings}
          fetchTrainings={fetchTrainings}
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
        styles={modalStyles}
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
