import { toast } from "react-toastify";

const useNotification = (message) => {
  toast(message);
};

export default useNotification;
