import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { GET_ADDRESSES, SET_SHIPPING } from "../../redux/type";
import { updateData } from "../../hooks/useUpdateData";

const EditAddressHook = (address) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(address.city);
  const [street, setStreet] = useState(address.street);
  const [details, setDetails] = useState(address.details);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [phone, setPhone] = useState(address.phone);

  let isShipping = false;

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

  const onCheck = (e) => {
    isShipping = e.target.checked;
  };

  const resetForm = () => {
    setCity(address.city);
    setDetails(address.details);
    setStreet(address.street);
    setPhone(address.phone);
    setPostalCode(address.postalCode);
  };

  const onSubmit = async () => {
    setLoading(true);
    toast.dismiss();
    try {
      const res = await updateData(`/addresses/${address._id}`, {
        city,
        street,
        details,
        postalCode,
        phone,
        isShipping,
      });
      dispatch({
        type: GET_ADDRESSES,
        addresses: res.data,
        shippingAddress: res.shippingAddress,
      });

      if (isShipping === true) {
        dispatch({ type: SET_SHIPPING, shippingAddress: address._id });
      }

      toast.success("Address edited successfully!");
      setShowModal(false);
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
    city,
    onCityChange,
    details,
    onDetailsChange,
    street,
    onStreetChange,
    postalCode,
    onPostalCodeChange,
    phone,
    onPhoneChange,
    onCheck,
    onSubmit,
    resetForm,
  };
};

export default EditAddressHook;
