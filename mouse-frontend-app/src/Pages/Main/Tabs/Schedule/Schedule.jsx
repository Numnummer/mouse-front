// import Button from "../../../StartPage/Components/Button/Button";
import Calendar from "./Components/Calendar/Calendar";
import "./Schedule.css";
import { useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker } from "antd";

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="user-page-container">
      <label className="title-label">Расписание</label>
      <div className="user-calendar">
        <Calendar />
      </div>
      <Button className="add-training" onClick={() => setOpen(true)}>
        Добавить тренировку
      </Button>
      <Modal
        title="Добавить тренировку"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <Button type="primary">Добавить тренировку</Button>
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
