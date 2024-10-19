import React, { useState } from "react";
import Chat from "./Components/Chat/Chat";
import ChooseDestination from "./Components/ChooseDestination/ChooseDestination";

export default function SupportChat() {
  const [destination, setDestination] = useState();
  return (
    <div>
      {destination ? (
        <Chat></Chat>
      ) : (
        <ChooseDestination setDestination={setDestination}></ChooseDestination>
      )}
    </div>
  );
}
