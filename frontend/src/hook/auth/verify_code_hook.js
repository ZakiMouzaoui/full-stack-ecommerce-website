import { useEffect, useState } from "react";
import { verifyCode } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyCodeHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const onComplete = async (code) => {
    setLoading(true);
    setIsCompleted(true);
    await dispatch(verifyCode({ resetCode: code }));

    setLoading(false);
    setIsCompleted(false);
  };

  const error = useSelector((state) => state.Auth.error);

  useEffect(() => {
    if (loading === false) {
      toast.dismiss();
      if (error) {
        if (error.code !== "ERR_NETWORK") {
          // REQUEST LIMIT ERROR
          if (error.response.status === 429) {
            toast.error(error.response.data, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }

          // MULTIPLE FIELDS ERRROS
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

          // 500 CODE ERRORS
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        navigate("/reset-password", { replace: true });
      }
    }
  }, [loading, error]);

  return [onComplete, loading, isCompleted, error];
};

export default VerifyCodeHook;
