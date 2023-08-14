import { useEffect, useState } from "react";
import { updateData } from "../../hooks/useUpdateData";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../redux/type";
import { toast } from "react-toastify";

const EditUserProfileHook = (user) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const resetForm = () => {
    setName(user.name);
    setPhone(user.phone);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);
    try {
      const res = await updateData("/users/updateAccount", { name, phone });

      dispatch({ type: LOGIN_USER, user: res.data });
      toast.success("Account updated successfully!");
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
    setLoading(false);
  };

  return {
    name,
    onNameChange,
    phone,
    onPhoneChange,
    onSubmit,
    resetForm,
    loading,
  };
};

export default EditUserProfileHook;
