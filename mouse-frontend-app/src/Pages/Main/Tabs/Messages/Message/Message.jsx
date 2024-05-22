import "./Message.css";
import img from "../../Icons/Trainer.png";

export default function Message({ message }) {
  const date = new Date(message.date);
  const options = {
    month: "short", // короткое название месяца
    day: "numeric", // день месяца
    year: "numeric", // год
    hour: "2-digit", // часы
    minute: "2-digit", // минуты
    hour12: false, // 24-часовой формат
  };
  const formattedDate = date.toLocaleString("en-US", options).replace(",", "");

  const wrapp = document.getElementsByClassName("message-container");
  wrapp.scrollTop = wrapp.scrollHeight;

  return (
    <div className="message-container">
      <div className="">
        <p className="author">{message.author}</p>
        <div className="message-and-icon">
          <p className="send">{message.body}</p>
          {/* <img className="trainer-icon" src={img} height={"45px"} /> */}
        </div>
        <p className="message-date">{formattedDate}</p>
      </div>
    </div>
  );
}
