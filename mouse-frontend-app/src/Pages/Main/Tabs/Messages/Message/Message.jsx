import "./Message.css";

export default function ({ message }) {
  return (
    <div>
      <label>{/*Здесь автор*/ message.author}</label>
      <label>{/*Здесь текст сообщения*/ message.body}</label>
      <label>{/*Здесь дата*/ message.date.toString()}</label>
    </div>
  );
}
