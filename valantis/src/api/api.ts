import md5 from "md5";

const password = process.env.REACT_APP_API_PASS;
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // Получаем текущую дату и приводим ее к формату годмесяцдень
const authString = password + "_" + timestamp;
const xAuth = md5(authString);

type dataT = {
  action: string;
  params?: Record<string, any>;
};

export const api = async (data: dataT) => {
  return await fetch("http://api.valantis.store:40000/", {
    method: "POST",
    headers: {
      "X-Auth": xAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
