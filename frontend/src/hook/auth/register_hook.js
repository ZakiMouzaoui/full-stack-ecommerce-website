import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/authAction";
import { toast } from "react-toastify";

const RegisterHook = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChnageConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = () => {
    dispatch(
      createUser({
        name,
        email,
        password,
        confirmPassword,
      })
    );

    setLoading(true);
    setIsPressed(true);

    setLoading(false);
    setIsPressed(false);
  };

  const user = useSelector((state) => state.Auth.createdUser);
  const token = useSelector((state) => state.Auth.token);
  const error = useSelector((state) => state.Auth.error);

  useEffect(() => {
    if (loading === false) {
      toast.dismiss();
      if (user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        window.location.href = "/";
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
    }
  }, [error, user]);

  return [
    loading,
    isPressed,
    onChangeName,
    onChangeEmail,
    onChangePassword,
    onChnageConfirmPassword,
    onSubmit,
    error,
  ];
};

export default RegisterHook;
