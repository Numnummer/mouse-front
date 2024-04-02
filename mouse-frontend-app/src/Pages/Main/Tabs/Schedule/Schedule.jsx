import Button from "../../../StartPage/Components/Button/Button";
import Calendar from "./Components/Calendar/Calendar";
import "./Schedule.css"

export default function Schedule() {
  return (
    <div className="user-page-container">
      <div className="user-calendar">
        <Calendar />
      </div>
      <div className="fill-profile-button">
        <Button text={'Добавить тренировку'}></Button>
      </div>
    </div>
  );
}
