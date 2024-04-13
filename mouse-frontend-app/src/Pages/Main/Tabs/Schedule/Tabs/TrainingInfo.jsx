import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Button from "../../../../StartPage/Components/Button/Button";
import { postNewExcercise } from "../../../../../Api/Excercise/PostNewExcercise";

export default function ({
  training,
  date,
  setCurrentTab,
  setCurrentExcercise,
}) {
  const [open, setOpen] = useState(false);
  const [excerciseData, setExcerciseData] = useState({
    name: "",
    description: "",
    approaches: "",
    repetitions: "",
    implementationProgress: "",
    explanationVideo: "",
  });
  const handleInputChange = () => {};
  const onModalOk = () => {
    setOpen(false);
    postNewExcercise(excerciseData);
    setExcercisePushSwithcher(!excercisePushSwitcher);
  };
  return (
    <div>
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
          {training.exercises.map((excercise, index) => {
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
      <button>Добавить упражнение</button>
    </div>
  );
}
