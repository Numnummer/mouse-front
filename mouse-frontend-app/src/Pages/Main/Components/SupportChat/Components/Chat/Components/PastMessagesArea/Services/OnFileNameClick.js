import { authToken } from "../../../../../../../../../Constants/LocalStorageItemKeys.js";
import { chatMessagesClient } from "../../../../../../../../../Constants/AxiosClients.js";

export function onFileNameClick(fileName) {
  const token = localStorage.getItem(authToken);
  return chatMessagesClient
    .get(`getOneFile/${fileName}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const link = document.createElement("a");
      link.href =
        "data:application/octet-stream;base64," + response.data.fileContent;
      link.download = response.data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
