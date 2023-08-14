import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    setIsPressed(true);
    setLoading(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );

    setLoading(false);
    setIsPressed(false);
  };

  const user = useSelector((state) => state.Auth.loginUser);
  const token = useSelector((state) => state.Auth.token);
  const error = useSelector((state) => state.Auth.error);

  useEffect(() => {
    if (loading === false) {
      toast.dismiss();
      if (user) {
        localStorage.setItem("token", token);
        // localStorage.setItem("user", JSON.stringify(user));

        // window.location.href = "/";
        queryClient.refetchQueries();
        navigate("/");
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

  return [loading, onChangeEmail, onChangePassword, onSubmit, isPressed, error];
};

export default LoginHook;
