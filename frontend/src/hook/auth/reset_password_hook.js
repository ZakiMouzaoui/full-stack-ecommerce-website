import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/authAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPassWordHook = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async () => {
    setIsPressed(true);
    setLoading(true);
    await dispatch(
      resetPassword({
        email,
        password,
        confirmPassword,
      })
    );

    setLoading(false);
    setIsPressed(false);
  };

  const error = useSelector((state) => state.Auth.error);

  useEffect(() => {
    if (loading === false) {
      toast.dismiss();
      if (!error) {
        window.location.href = "/login";
      } else {
        if (error) {
          if (error.code !== "ERR_NETWORK") {
            if (error.response.status === 429) {
              toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
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
          }
        }
      }
      setLoading(true);
    }
  }, [loading, error]);

  return [
    loading,
    onChangeEmail,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
    isPressed,
    error,
  ];
};

export default ResetPassWordHook;
