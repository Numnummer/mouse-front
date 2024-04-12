import Calendar from "../Components/Calendar/Calendar";
import "../Schedule.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";
import { startOfToday } from "date-fns";

export default function () {
  const [open, setOpen] = useState(false);
  const onAddTraining = () => {
    setOpen(false);
    setToday(startOfToday());
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [today, setToday] = useState(startOfToday());
  return (
    <div className="user-page-container">
      <label className="title-label">Расписание</label>
      <div className="user-calendar">
        <Calendar today={today} setToday={setToday} />
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
          ></input>
          <DatePicker className="date-picker" onChange={onChange} needConfirm />
        </div>
      </Modal>
    </div>
  );
}
