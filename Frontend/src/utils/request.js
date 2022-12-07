import axios from "axios"

export const axiosRequest = (url, methods, data) => {
    const Etoken = localStorage.getItem("Etoken")
      ? localStorage.getItem("Etoken")
      : undefined;
    // console.log(Etoken)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Etoken}`,
      },
    };
    return axios[methods](url, data, config).then((res) => res.data);
  };