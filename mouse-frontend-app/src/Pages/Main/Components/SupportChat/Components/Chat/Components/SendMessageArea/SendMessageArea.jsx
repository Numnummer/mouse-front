import React, { useState } from "react";
import "./SendMessageArea.css";
import PropTypes from "prop-types";
import { HubConnection } from "@microsoft/signalr";
import onSendMessage from "./Services/OnSendMessage.js";
import { onFileChange } from "./Services/OnFileChange.js";
import { uint8ArrayToBase64 } from "../../../../../../../../CommonServices/Uint8ArrayToBase64.js";

export default function SendMessageArea({
  connection,
  destination,
  isUnicast,
  email,
  setMessages,
  role,
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileContents, setFileContents] = useState([]);
  return (
    <div>
      <div className="SendMessageArea_Container">
        <input
          className="SendMessageArea_Input"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          value={currentMessage}
        ></input>
        <button
          className="SendMessageArea_Button"
          onClick={() => {
            console.log(fileContents);
            onSendMessage(
              email,
              connection,
              setMessages,
              currentMessage,
              setCurrentMessage,
              destination,
              isUnicast,
              role,
              fileContents.map((file) => file.fileName),
              fileContents.map((file) =>
                uint8ArrayToBase64(new Uint8Array(file.content)),
              ),
            );
          }}
        >
          Отправить
        </button>
      </div>
      <input
        className="SendMessageArea_FileInput"
        type="file"
        onChange={(e) => onFileChange(e, setSelectedFiles, setFileContents)}
        multiple // Allows selecting multiple files
      />
    </div>
  );
}

SendMessageArea.propTypes = {
  connection: PropTypes.instanceOf(HubConnection).isRequired,
  destination: PropTypes.string.isRequired,
  isUnicast: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  setMessages: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
