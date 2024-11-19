export default function onBackButtonClick(
  groupDestination,
  setMessages,
  setIsUnicast,
  setDestination,
  isUnicast,
  connection,
) {
  if (isUnicast) {
    setDestination(groupDestination);
    setIsUnicast(false);
  } else {
    connection.stop().then(() => {
      setDestination(undefined);
    });
  }
}
