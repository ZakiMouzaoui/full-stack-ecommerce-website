import { useDispatch, useSelector } from "react-redux";
import {
  CHANGE_MAX_PRICE,
  CHANGE_MIN_PRICE,
  CHECK_BRAND,
  CHECK_CATEGORY,
} from "../../redux/type";
import { useState } from "react";
import useFilterProductsHook from "../product/userFilterProductsHook";

const SideFilterHook = () => {
  const categories = useSelector((state) => state.Filter.categories);
  const brands = useSelector((state) => state.Filter.brands);
  const minPrice = useSelector((state) => state.Filter.minPrice);
  const maxPrice = useSelector((state) => state.Filter.maxPrice);
  const url = new URL(window.location);
  const [minPriceRef, setMinPrice] = useState(minPrice);
  const [maxPriceRef, setMaxPrice] = useState(maxPrice);

  const dispatch = useDispatch();

  const onCategoryClick = async (e) => {
    const value = e.target.value;
    if (value !== "0") {
      url.searchParams.set("category", value);
    } else {
      url.searchParams.delete("category");
    }

    window.history.pushState(null, "", url.toString());
    dispatch({ type: CHECK_CATEGORY, category: value });
  };

  const onBrandClick = (e) => {
    let checkedBrands = url.searchParams.getAll("brand");

    if (e.target.checked) {
      if (e.target.value === "0") {
        checkedBrands = [];
      } else {
        checkedBrands.push(e.target.value);
      }
    } else {
      checkedBrands = checkedBrands.filter((val) => val !== e.target.value);
    }

    url.searchParams.delete("brand");
    checkedBrands.forEach((id) => url.searchParams.append("brand", id));

    window.history.pushState(null, "", url.toString());
    dispatch({ type: CHECK_BRAND, checkedBrands });
    // const { fetch } = useFilterProductsHook();
    // fetch(true);
  };

  const onMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const onMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const onSubmitPrice = () => {
    if (minPriceRef) {
      dispatch({ type: CHANGE_MIN_PRICE, price: minPriceRef });
      url.searchParams.set("minPrice", minPriceRef);
    }
    if (maxPriceRef) {
      url.searchParams.set("maxPrice", maxPriceRef);
      dispatch({ type: CHANGE_MAX_PRICE, price: maxPriceRef });
    }

    window.history.pushState(null, "", url.toString());
  };

  return [
    categories,
    brands,
    onCategoryClick,
    onBrandClick,
    minPriceRef,
    maxPriceRef,
    onMinPriceChange,
    onMaxPriceChange,
    onSubmitPrice,
  ];
};

export default SideFilterHook;
