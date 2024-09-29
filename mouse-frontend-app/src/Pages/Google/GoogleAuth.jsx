import queryString from "query-string";
import { useEffect } from "react";
import {
  clientIdGoogle,
  clientSecretGoogle,
  redirectUrlGoolgle,
} from "../../Constants/Google";
import { userClient } from "../../Constants/AxiosClients";
import { useNavigate } from "react-router-dom";
import { authToken } from "../../Constants/LocalStorageItemKeys";
import React from "react";

export default function GoogleAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    console.log(params);
    if (params.code) {
      const tokenUrl = "https://oauth2.googleapis.com/token";

      const data = {
        grant_type: "authorization_code",
        code: params.code,
        client_id: clientIdGoogle,
        client_secret: clientSecretGoogle,
        redirect_uri: redirectUrlGoolgle,
      };

      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
      };
      fetch(tokenUrl, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          userClient
            .post("registerWithGoogle", null, {
              params: {
                token: data.id_token,
              },
            })
            .then((resp) => {
              console.log(resp);
              let token = resp.data.jwtToken;
              localStorage.setItem(authToken, token);
              navigate("Main");
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);
  return (
    <>
      <p>Hello</p>
    </>
  );
}
