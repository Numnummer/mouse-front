import { useState } from "react";
import "./SendMessageBar.css";
import sendMessage from "./Services/SendMessage";

// eslint-disable-next-line react/prop-types
export default function SendMessageBar ({ connection, userId }) {
  const [message, setMessage] = useState("");
    console.log(userId.toString() + "-----------------------------------------")

  return (
      <div>
          <input
              type="text"
              value={message}
              onChange={(e) => {
                  setMessage(e.target.value);
              }}
          />
          <button
              onClick={() => {
                  sendMessage(userId, message, connection);
              }}
          ></button>
      </div>
  );
}
