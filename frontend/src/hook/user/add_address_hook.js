import { useState } from "react";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GET_ADDRESSES, SET_SHIPPING } from "../../redux/type";

const AddAddressHook = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [details, setDetails] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const onCityChange = (e) => {
    setCity(e.target.value);
  };

  const onStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const onDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const onPostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const resetForm = () => {
    setCity("");
    setDetails("");
    setStreet("");
    setPhone("");
    setPostalCode("");
  };

  const onSubmit = async () => {
    setLoading(true);
    toast.dismiss();
    try {
      const res = await insertData("/addresses", {
        city,
        street,
        details,
        postalCode,
        phone,
      });
      dispatch({ type: GET_ADDRESSES, addresses: res.data });
      dispatch({ type: SET_SHIPPING, shippingAddress: res.shippingAddress });

      toast.success("Address added successfully!");
      setShowModal(false);
      resetForm();
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
    loading,
    showModal,
    setShowModal,
    onCityChange,
    onDetailsChange,
    onStreetChange,
    onPostalCodeChange,
    onPhoneChange,
    onSubmit,
    resetForm,
  };
};

export default AddAddressHook;
