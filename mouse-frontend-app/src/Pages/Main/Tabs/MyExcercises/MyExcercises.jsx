import { useState } from "react";
import { Button, Modal } from "antd";
import './MyExcercises.css'

export default function MyExcercises() {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-page-container">
      <label className="title-label">Мои упражнения</label>
      <div className="exercises">
        <div className="exercise"></div>
        <div className="exercise"></div>
        <div className="exercise"></div>
      </div>
      <Button className="add-training" onClick={() => setOpen(true)}>
        Добавить упражнение
      </Button>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={(_, { CancelBtn }) => (
          <>
            <Button type="primary">Добавить упражнение</Button>
            <CancelBtn />
          </>
        )}
      >
        <div className="">
          <input className="inputs" placeholder={"Наименование тренировки"}></input>
          <input className="inputs" placeholder={"Описание"}></input>
          <input className="inputs" placeholder={"Ход выполнения"}></input>
          <input className="inputs" placeholder={"Ссылка на видео"}></input>
          <input className="inputs" placeholder={"Количество повторений"}></input>
          <input className="inputs" placeholder={"Количество подходов"}></input>
        </div>        
      </Modal>
    </div>
  );
}
