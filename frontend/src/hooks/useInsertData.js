import BaseURL from "../api/BaseURL";

export const insertData = async (url, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await BaseURL.post(url, body, config);
  return res.data;
};
