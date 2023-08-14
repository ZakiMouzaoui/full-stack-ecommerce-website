import baseUrl from "../api/BaseURL";

const getData = async (url, params) => {
  const res = await baseUrl.get(url, params);
  return res.data;
};

const getDataWithToken = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  // await new Promise((res) => setTimeout(res, 1500));
  const res = await baseUrl.get(url, config, params);
  return res.data;
};

export { getData, getDataWithToken };
