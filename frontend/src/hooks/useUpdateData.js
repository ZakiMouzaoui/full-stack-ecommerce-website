import BaseURL from "../api/BaseURL";

export const updateData = async (url, body, withImage = false) => {
  let headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  if (withImage === true) {
    headers["Content-Type"] = "multipart/form-data";
  }

  const config = {
    headers,
  };

  const res = await BaseURL.put(url, body, config);
  return res.data;
};
