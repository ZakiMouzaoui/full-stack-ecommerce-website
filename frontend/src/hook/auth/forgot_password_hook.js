import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async () => {
    setLoading(true);
    setIsPressed(true);

    await dispatch(
      forgotPassword({
        email,
      })
    );

    setLoading(false);
    setIsPressed(false);
  };

  const error = useSelector((state) => state.Auth.error);
  useEffect(() => {
    if (loading === false) {
      toast.dismiss();
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
      } else {
        toast.success("A reset link was sent to your email");
        setTimeout(() => {
          navigate("/verify-code");
        }, 1000);
        navigate();
      }
      setLoading(true);
    }
  }, [loading]);

  return [onChangeEmail, loading, isPressed, onSubmit, error];
};

export default ForgotPasswordHook;
