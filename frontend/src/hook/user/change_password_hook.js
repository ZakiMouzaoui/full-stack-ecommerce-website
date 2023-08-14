import { useState } from "react";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../redux/type";

const ChnagePasswordHook = () => {
  const [oldPwd, setOldPwd] = useState("");
  const [pwd, setPwd] = useState("");
  const [Pwd2, setPwd2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOldPwdChange = (e) => {
    setOldPwd(e.target.value);
  };

  const onPwdChange = (e) => {
    setPwd(e.target.value);
  };
  const onPwd2Change = (e) => {
    setPwd2(e.target.value);
  };

  const resetForm = () => {
    setOldPwd("");
    setPwd("");
    setPwd2("");
  };

  const onPwdSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      await updateData("/users/changePassword", {
        currentPassword: oldPwd,
        password: pwd,
        confirmPassword: Pwd2,
      });
      toast.success("Password changed successfully!");
      navigate("/login");
      dispatch({ type: LOGIN_USER, user: null });
    } catch (error) {
      if (error.code !== "ERR_NETWORK") {
        if (error.response.data.errors) {
          const set = new Set();

          error.response.data.errors.forEach((err) => {
            if (!set.has(err.param)) {
              toast.error(err.msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
              set.add(err.param);
            }
          });
        }
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Something went wrong. Please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    resetForm();
  };

  return {
    oldPwd,
    onOldPwdChange,
    pwd,
    onPwdChange,
    Pwd2,
    onPwd2Change,
    onPwdSubmit,
  };
};

export default ChnagePasswordHook;
