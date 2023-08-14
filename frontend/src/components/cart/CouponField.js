import { memo, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateData } from "../../hooks/useUpdateData";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { APPLY_COUPON } from "../../redux/type";

const CouponField = () => {
  const codeRef = useRef("");
  const queryClient = useQueryClient();
  const totalPriceAfterDiscount = useSelector(
    (state) => state.Cart.totalPriceAfterDiscount
  );
  const dispatch = useDispatch();

  const mutation = useMutation(
    {
      mutationFn: () => {
        return updateData("/cart/applyCoupon", { code: codeRef.current.value });
      },
    },

    {
      retry: false,
    }
  );

  const onSubmit = async () => {
    try {
      const res = await mutation.mutateAsync();
      queryClient.setQueryData("cart-query", (old) => {
        return {
          ...old,
          discount: res.discount,
          totalCartPriceAfterDiscount: res.totalCartPriceAfterDiscount,
        };
      });

      dispatch({
        type: APPLY_COUPON,
        totalPriceAfterDiscount: res.totalCartPriceAfterDiscount,
        discount: res.discount,
        coupon: res.coupon,
      });
      codeRef.current.value = "";
      toast.success("Coupon code applied successfully!");
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
  };

  return (
    <div className="d-flex px-3">
      <input
        className="p-2 d-block w-100"
        type="text"
        ref={codeRef}
        placeholder="Coupon code"
        disabled={!!totalPriceAfterDiscount}
      ></input>
      <button
        className={`coupon-btn d-block ${
          totalPriceAfterDiscount ? "disabled-cart" : ""
        }`}
        style={{ width: "10rem" }}
        onClick={onSubmit}
        disabled={totalPriceAfterDiscount}
      >
        {mutation.isLoading ? (
          <Spinner style={{ height: "20px", width: "20px" }}></Spinner>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default memo(CouponField);
