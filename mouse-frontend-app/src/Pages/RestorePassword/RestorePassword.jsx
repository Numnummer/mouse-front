import { useState } from "react";
import "./RestorePassword.css";
import { getCode, resetPassword } from "./Functions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { enterPath } from "../../Constants/Paths";

export default function () {
  const [gotCode, setGotCode] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
      ></ToastContainer>
      <label>Email:</label>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      {gotCode && (
        <>
          <label>Код: </label>
          <input
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></input>
          <label>Новый пароль: </label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </>
      )}
      {!gotCode ? (
        <button
          onClick={() => {
            getCode(email)
              .then((res) => {
                toast("Код отправлен на указанную почту");
                setGotCode(true);
              })
              .catch((err) => {
                toast("Не удалось отправить код");
              });
          }}
        >
          Получить код
        </button>
      ) : (
        <button
          onClick={() => {
            resetPassword(email, password, code)
              .then((res) => {
                toast("Новый пароль установлен");
                navigate(enterPath);
              })
              .catch((err) => {
                toast("Не удалось отправить код");
              });
          }}
        >
          Установить пароль
        </button>
      )}
    </>
  );
}
