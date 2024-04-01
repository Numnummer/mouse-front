import Button from "../../../StartPage/Components/Button/Button";
import Calendar from "./Components/Calendar/Calendar";
import "./Schedule.css"

export default function Schedule() {
  return (
    <>
      <div>
        <Calendar></Calendar>
      </div>
      <div className="fill-profile-button">
        <Button text={'Добавить тренировку'}></Button>
      </div>
    </>
  );
}
