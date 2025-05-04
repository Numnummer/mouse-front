import { authToken } from "../../Constants/LocalStorageItemKeys.js";
import { paymentsClient } from "../../Constants/AxiosClients.js";

export default function processPayment(name) {
  const token = localStorage.getItem(authToken);
  console.log(name.name);
  return paymentsClient
    .post(
      "processPayment",
      { productName: name.name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
