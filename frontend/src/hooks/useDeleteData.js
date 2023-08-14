import BaseURL from "../api/BaseURL";

const deleteData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await BaseURL.delete(url, config, params);
  return res.data;
};

export default deleteData;
