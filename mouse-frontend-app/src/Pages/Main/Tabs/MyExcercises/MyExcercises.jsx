import { useEffect, useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import "./MyExcercises.css";
import { getAllExcercises } from "../../../../Api/Excercise/GetAllExcercises";
import { postNewExcercise } from "../../../../Api/Excercise/PostNewExcercise";
import image from "../../../../../public/video-image.png";
import { deleteExcercise } from "../../../../Api/Excercise/DeleteExcercise";
import { ToastContainer, toast } from "react-toastify";
import React from "react";

export default function MyExcercises() {
  const [open, setOpen] = useState(false);
  const [excercisePushSwitcher, setExcercisePushSwithcher] = useState(false);

  const [excerciseData, setExcerciseData] = useState({
    name: "",
    description: "",
    approaches: "",
    repetitions: "",
    implementationProgress: "",
    explanationVideo: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExcerciseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onModalOk = () => {
    setOpen(false);
    postNewExcercise(excerciseData)
      .then(() => {
        setExcercisePushSwithcher(!excercisePushSwitcher);
      })
      .catch(() => {
        toast.error("Не удалось добавить упражнение", { autoClose: 2000 });
      });
  };

  const [allExcercises, setAllExcercises] = useState({
    totalCount: 0,
    items: [
      {
        name: "",
        description: "",
        approaches: 0,
        repetitions: 0,
        implementationProgress: "",
        explanationVideo: "",
      },
    ],
  });

  useEffect(() => {
    getAllExcercises()
      .then((data) => {
        setAllExcercises(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [excercisePushSwitcher]);

  return (
    <div className="user-page-container">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
      ></ToastContainer>
      <label className="title-label">Мои упражнения</label>
      <div className="exercises">
        {allExcercises.items.map((excercise, index) => (
          <div key={index} className="exercise">
            <div className="exercise-inner">
              <label className="exercise-name">{excercise.name}</label>
              <div className="exercise-description">
                <label>{excercise.description}</label>
              </div>
              <div className="exe-video">
                <a className="exercise-video" href={excercise.explanationVideo}>
                  <img className="exercise-img" src={image} />
                </a>
                <Tooltip title="удалить упражнение">
                  <Button
                    className="delete-button"
                    onClick={() => {
                      deleteExcercise(excercise.id).then(() => {
                        setExcercisePushSwithcher(!excercisePushSwitcher);
                      });
                    }}
                  >
                    x
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="add-training" onClick={() => setOpen(true)}>
        Добавить упражнение
      </Button>
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
            onChange={handleInputChange}
            name={"name"}
            className="inputs"
            placeholder={"Наименование тренировки"}
          ></input>
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
            type="number"
            name={"repetitions"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Количество повторений"}
          ></input>
          <input
            type="number"
            name={"approaches"}
            onChange={handleInputChange}
            className="inputs"
            placeholder={"Количество подходов"}
          ></input>
        </div>
      </Modal>
    </div>
  );
}
