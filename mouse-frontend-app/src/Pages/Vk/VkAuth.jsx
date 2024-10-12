import axios from "axios";
import queryString from "query-string";
import { useEffect } from "react";
import {
  CLIENT_ID,
  REDIRECT_URI,
  ServiceKey,
  VK_AUTHORIZATION_URI,
} from "../../Constants/Vk";

export default function () {
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    axios
      .get(
        `${VK_AUTHORIZATION_URI}access_token?client_id=${CLIENT_ID}&client_secret=${ServiceKey}&redirect_uri=${REDIRECT_URI}&code=${params.code}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  }, []);
}
