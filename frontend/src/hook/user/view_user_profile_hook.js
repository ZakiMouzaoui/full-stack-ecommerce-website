import { useEffect } from "react";
import { getDataWithToken } from "../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_USER } from "../../redux/type";
import { useNavigate } from "react-router-dom";

const ViewUserProfileHook = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.loginUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getDataWithToken("/users/account");
        dispatch({ type: LOGIN_USER, user: res.user });
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/login");
        }
      }
    };

    getProfile();
  }, [dispatch, navigate]);

  return { user };
};

export default ViewUserProfileHook;
