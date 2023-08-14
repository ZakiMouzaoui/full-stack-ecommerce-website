import { useEffect, useState } from "react";
import { updateData } from "../../hooks/useUpdateData";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EDIT_COUPON } from "../../redux/type";

const EditCouponHook = () => {
  const [editLoading, setEditLoading] = useState(false);
  const [showEditValue, setShowEditValue] = useState(false);
  const [discountEdit, setDiscountEdit] = useState(null);
  const [codeEdit, setCodeEdit] = useState("");
  const [expireEdit, setExpireEdit] = useState(Date.now());
  const [usageLimitEdit, setUsageLimitEdit] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditMinPrice, setShowEditMinPrice] = useState(false);
  const [minEditPrice, setMinEditPrice] = useState(null);
  const [discountEditType, setDiscountEditType] = useState("");

  const coupon = useSelector((state) => state.Coupon.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon) {
      setCodeEdit(coupon.code);
      setExpireEdit(coupon.expireDate);
      setUsageLimitEdit(coupon.usageLimit);
      setDiscountEdit(coupon.discount);
      setDiscountEditType(coupon.discountType);
      setShowEditValue(true);
      setShowEditMinPrice(coupon.discountType === "value");
      setMinEditPrice(coupon.minPrice);
    }
  }, [coupon]);

  const onTypeChangeEdit = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setShowEditValue(true);
      if (value === "value") {
        setShowEditMinPrice(true);
      } else {
        setShowEditMinPrice(false);
      }
      setDiscountEditType(value);
    } else {
      setShowEditValue(false);
    }
  };

  const onMinPriceChangeEdit = (e) => {
    setMinEditPrice(e.target.value);
  };

  const onDiscountChangeEdit = (e) => {
    setDiscountEdit(e.target.value);
  };

  const onCodeChangeEdit = (e) => {
    setCodeEdit(e.target.value);
  };

  const onExpireChangeEdit = (e) => {
    setExpireEdit(e.target.value);
  };

  const onUsageLimitChangeEdit = (e) => {
    setUsageLimitEdit(e.target.value);
  };

  const resetEditForm = () => {
    setCodeEdit(coupon.code);
    setExpireEdit(coupon.expireDate);
    setUsageLimitEdit(coupon.usageLimit);
    setDiscountEdit(coupon.discount);
    setDiscountEditType(coupon.discountType);
    setShowEditValue(true);
    setShowEditMinPrice(coupon.discountType === "value");
    setMinEditPrice(coupon.minPrice || "");
  };

  const onEditSubmit = async () => {
    setEditLoading(true);

    try {
      const res = await updateData(`/coupons/${coupon._id}`, {
        code: codeEdit,
        expireDate: expireEdit,
        discountType: discountEditType,
        usageLimit: usageLimitEdit,
        minPrice: minEditPrice,
        discount: discountEdit,
      });

      dispatch({ type: EDIT_COUPON, payload: res });

      toast.success("Coupon edited successfully!");
      setShowEditModal(false);
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
    setEditLoading(false);
  };

  return {
    editLoading,
    showEditModal,
    setShowEditModal,
    showEditValue,
    discountEdit,
    discountEditType,
    onTypeChangeEdit,
    codeEdit,
    onCodeChangeEdit,
    expireEdit,
    onExpireChangeEdit,
    usageLimitEdit,
    onUsageLimitChangeEdit,
    showEditMinPrice,
    minEditPrice,
    onMinPriceChangeEdit,
    onDiscountChangeEdit,
    resetEditForm,
    onEditSubmit,
  };
};

export default EditCouponHook;
