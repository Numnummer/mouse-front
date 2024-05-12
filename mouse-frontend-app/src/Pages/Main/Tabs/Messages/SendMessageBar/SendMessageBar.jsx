import { useState } from "react";
import "./SendMessageBar.css";
import sendMessage from "./Services/SendMessage";

export default function ({ userName }) {
  const [message, setMessage] = useState("");
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          sendMessage(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage(userName, message);
          setMessage("");
        }}
      ></button>
    </div>
  );
}
