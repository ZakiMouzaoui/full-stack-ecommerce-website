import { useState } from "react";
import { insertData } from "../../hooks/useInsertData";
import { toast } from "react-toastify";

const AddCouponHook = () => {
  const [addLoading, setAddLoading] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [code, setCode] = useState("");
  const [expire, setExpire] = useState(Date.now());
  const [usageLimit, setUsageLimit] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMinPrice, setShowMinPrice] = useState(false);
  const [minPrice, setMinPrice] = useState(null);
  const [discountType, setDiscountType] = useState("");

  const onTypeChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setShowValue(true);
      if (value === "value") {
        setShowMinPrice(true);
      } else {
        setShowMinPrice(false);
      }
      setDiscountType(value);
    } else {
      setShowValue(false);
    }
  };

  const onMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const onDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const onCodeChange = (e) => {
    setCode(e.target.value);
  };

  const onExpireChange = (e) => {
    setExpire(e.target.value);
  };

  const onUsageLimitChange = (e) => {
    setUsageLimit(e.target.value);
  };

  const resetAddForm = () => {
    setCode("");
    setShowMinPrice(false);
    setShowValue(false);
  };

  const onAddSubmit = async () => {
    setAddLoading(true);
    try {
      const res = await insertData("/coupons", {
        code,
        expireDate: expire,
        discountType,
        usageLimit,
        minPrice,
        discount,
      });
      console.log(res);
      toast.success("Coupon added successfully!");
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
    setAddLoading(false);
  };

  return {
    addLoading,
    showAddModal,
    setShowAddModal,
    showValue,
    discount,
    onTypeChange,
    onCodeChange,
    expire,
    onExpireChange,
    onUsageLimitChange,
    showMinPrice,
    onMinPriceChange,
    onDiscountChange,
    resetAddForm,
    onAddSubmit,
  };
};

export default AddCouponHook;
